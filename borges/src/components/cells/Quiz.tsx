import { defaultLessonStyle } from './Lesson'
import { Title } from '../atoms'
import { useState } from 'react'

import amplitude from 'amplitude-js'

const messages = {
    encouragementMsg: 'Come on! Give it another shot.',
    retryMsg: 'I invite you to restart the module.',
    button:{
        next:'Continue',
        retry:'Retry',
        restart:'Retry',
        send:'Submit'
    },
    title:{
        pass:'Congratulations!',
        fail:'Sorry!'
    },
    score:['You got right', 'out of', 'questions.'],
    instructions:['You need at least', 'correct question', 'to approve.']
}


interface iAnswer { answer:string, value:boolean }
export interface iQuestion { question:string, answers:iAnswer[] }

interface IQuestion extends iQuestion { index:number, value:number, select(index:number, value:number):void }
const Question = ({index, question, value, answers, select}:IQuestion) => <div 
    className="field" 
    style={{textAlign:'left', maxWidth:720, margin:'auto', marginBottom:'1.5rem'}}
>
    <label className="label" style={{fontSize:'1.25em'}}> { question } </label>
    {
        answers.map(({ answer:a }, i) => 
            <div className="control" key={i}>
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


const Score = ({score, questions}:{score:number, questions:number}) => <>
    {messages.score[0]} <strong>{score}</strong> {messages.score[1]} <strong>{questions}</strong> {messages.score[2]} <br/>
</>

const Instructions = ({min}: {min:number}) => <> 
    {messages.instructions[0]} <strong>{min}</strong> {messages.instructions[1]}{min > 1 ? 's' : ''} {messages.instructions[2]} <br/>
</>

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
                { 
                    approved 
                        ?   <span style={{fontSize:'1.5rem', fontWeight:600}}> { messages.title.pass } </span> 
                        :   <span style={{fontWeight:500}}> { messages.title.fail } </span> 
                } 
                
                <br/><br/>

                <Score score={score} questions={questions.length}/>
                { !approved && quizFailures === 1 ? <Instructions min={min}/> : null }
                { !approved && quizFailures === 1 ? <><br/>{ messages.encouragementMsg }</> : null }
                { !approved && quizFailures === 2 ? <><br/>{ messages.retryMsg }</> : null }

                <br/><br/>
            </p>
        </section>

        <footer className="modal-card-foot">
            <button className='button is-link' onClick={next} style={{backgroundColor:'darkblue', margin:'auto'}}> 
                { 
                    approved || quizFailures === 0 
                        ? messages.button.next 
                        : !approved && quizFailures === 1 
                            ? messages.button.restart 
                            : messages.button.retry 
                }
            </button>
        </footer>
    </div>
</div>


interface iQuiz { 
    title?:string
    description?:string,
    questions?:iQuestion[]
    min:number,
    quizFailures:number
    children: JSX.Element | JSX.Element[]
    next():void
    approve(score:number):boolean|void
}

export const Quiz = ({ title, description, questions=[], min, quizFailures, children, next, approve }: iQuiz) =>  {
    const [isActive, setActive] = useState(false)
    const [values, setValues] = useState<{[idx:number]:number}>(
        questions.reduce((d, _, idx) => ({...d, [idx]: -1 }), {})
    )

    const [score, setScore] = useState<number>() 
    const [approved, setApproved] = useState<boolean>()
    const submit = () => {
        const answers = Object.entries(values).map(([k, v]) => questions[k as unknown as number].answers[v])
        const score = answers.filter(a=>a.value).length
        setScore(score)

        const isApproved = approve(score) || false
        setApproved(isApproved)

        setActive(true)
        amplitude.getInstance().logEvent('SUBMIT_QUIZ', { score, answers })
    }

    const modalClick = () => {
        next()
        setActive(false)
        if(quizFailures === 1) setValues(questions.reduce((d, _, idx) => ({...d, [idx]: -1 }), {}))
    }

    return <div className="content" style={defaultLessonStyle}>
        <Title text={title} style={{color:'chocolate', marginBottom:'2rem'}} />
        <p style={{ fontSize:21, paddingBottom:'2rem', textAlign:'left', maxWidth:720, margin:'auto' }}> { description } </p>

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

        { children }

        <button 
            className='button is-link' 
            style={{borderRadius:12, width:180, fontSize:'1.25rem', fontWeight:600, marginTop:'2em', backgroundColor:'darkblue'}}
            disabled={Object.values(values).some(a => a === -1)}
            onClick={submit}
        > {messages.button.send} </button>

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
