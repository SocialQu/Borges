import { useMediaQuery } from 'react-responsive'
import { useState } from "react"


interface iAnswer { answer:string, value:boolean }
export interface iQuestion { question:string, answers:iAnswer[] }

interface IQuestion extends iQuestion { index:number, value:number, select(index:number, value:number):void }
const Question = ({index, question, value, answers, select}:IQuestion) => <div 
    className="field" 
    style={{textAlign:'left', maxWidth:800, margin:'auto', marginBottom:'1.5rem'}}
>
    <label className="label" style={{fontSize:'1.25em'}}> { question } </label>
    {
        answers.map(({ answer:a }, i) => 
            <div className="control">
                <label className="radio" style={{fontSize:'1.25em', marginBottom:'0.25em'}}>
                    <input 
                        type="radio" 
                        checked={value === i}
                        name={String(index)}
                        style={{marginRight:12}}
                        onChange={() => select(index, i)}
                    />
                    { a }
                </label>
            </div>
        )
    }
</div>



const encouragementMsg = `¡Ánimo aún tienes otra oportunidad!`
const retryMsg = 'Te invitamos a reiniciar el módulo.'
interface iModal { 
    questions: iQuestion[]
    score: number
    isActive:boolean
    approved:boolean
    min:number
    quizFailures:number
    deactivate():void
    next():void 
}

const Modal = ({ questions, score, isActive, approved, min, quizFailures, deactivate, next }:iModal) => <div 
    className={`modal ${isActive ? 'is-active' : ''}`}
>
    <div className="modal-background" />
    <div className="modal-card">
        <header className="modal-card-head" style={{backgroundColor:'darkblue'}}>
            <p className="modal-card-title" style={{marginBottom:0, color:'white'}}>Quiz</p>
            { approved && <button className="delete" aria-label="close" style={{float:'right'}} onClick={deactivate}/> }
        </header>

        <section className="modal-card-body" style={{minHeight:120, display:'table'}}>
            <p style={{display:'table-cell', verticalAlign:'middle'}}>
                { approved ? <span style={{fontSize:'1.5rem', fontWeight:600}}>¡Felicidades!</span> : <>Lo sentimos.</> } <br/> 
                 Acertaste <strong>{score}</strong> de <strong>{questions.length}</strong> preguntas. <br/>
                { 
                    !approved && quizFailures === 1 
                    ? <>Necesitas {min} pregunta{min > 1 ? 's' : ''} correcta para aprobar. <br/></>
                    : '' 
                }
                { !approved && quizFailures === 1 ? <><br/>{encouragementMsg}</> : '' }
                { !approved && quizFailures === 2 ? <><br/>{ retryMsg }</> : '' }
            </p>
        </section>

        <footer className="modal-card-foot">
            <button className='button is-link' onClick={next} style={{backgroundColor:'darkblue', margin:'auto'}}> 
                { approved || quizFailures === 0 ? `Continuar` : '' }
                { !approved && quizFailures === 1 ? `Intentar de Nuevo` : '' }
                { !approved && quizFailures === 2 ? `Reiniciar` : '' }
            </button>
        </footer>
    </div>
</div>


interface iQuiz { 
    title:string
    description:string,
    questions?:iQuestion[]
    min?:number,
    quizFailures:number
    next():void
    approve(score:number):boolean|void
}
export const Quiz = ({ title, description, questions=[], min, next, approve, quizFailures }: iQuiz) =>  {
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    const [isActive, setActive] = useState(false)
    const [values, setValues] = useState<{[idx:number]:number}>(
        questions.reduce((d, _, idx) => ({...d, [idx]: -1 }), {})
    )

    const [score, setScore] = useState<number>() 
    const [approved, setApproved] = useState<boolean>()
    const submit = () => {
        const answers = Object.entries(values).map(([k, v]) => questions[k as unknown as number].answers[v].value)
        const score = answers.filter(a=>a).length
        setScore(score)

        const isApproved = approve(score) || false
        setApproved(isApproved)

        setActive(true)
    }

    const modalClick = () => {
        next()
        setActive(false)
        if(quizFailures === 1) setValues(questions.reduce((d, _, idx) => ({...d, [idx]: -1 }), {}))
    }

    return <div className="content">
        <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'darkblue'}}> { title } </h1>
        <h3 
            style={{
                margin:'0rem auto 2rem',
                color: '#333',
                fontSize: '1.25em',
                textAlign: 'left',
                fontWeight: 500,
                width: !smallScreen ? 800 : 320        
            }}
        > { description } </h3>

        {
            questions.map((q, i) => 
                <Question 
                    {...q}
                    key={i} 
                    index={i}
                    value={values[i]}
                    select={(idx, i) => setValues({...values, [idx]:i})}
                />
            )
        }

        <button 
            className='button is-link' 
            style={{borderRadius:12, width:180, fontSize:'1.25rem', fontWeight:600, marginTop:'2em', backgroundColor:'darkblue'}}
            disabled={Object.values(values).some(a => a === -1)}
            onClick={submit}
        > ENVIAR </button>

        <Modal 
            isActive={isActive} 
            questions={questions}
            deactivate={()=> setActive(false)}

            score={score as number}
            approved={approved as boolean}
            min={min as number}
            quizFailures={quizFailures}

            next={modalClick}
        />
    </div>
}
