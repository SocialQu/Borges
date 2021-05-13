import { Lesson } from "../components/cells/Lesson"
import { Scatter } from "../components/atoms/Chart"

const data = [
    {name:'King', x:5, y:5}, 
    {name:'Man', x:4, y:4},
    {name:'Woman', x:2, y:2},
    {name:'Queen', x:3, y:3}
]

const title = 'Application: Solving Analogies'
interface iAnalogies {next():void}
export const Analogies = ({next}:iAnalogies) => <Lesson title={title} next={next}>
    <p>
        Congratulations! You now know how to train a simple word embeddings model. 
        The next application uses also basic vector operations to solve a slightly more difficult problem. 
    </p>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <p style={{textAlign:'left', marginLeft:100}}>
        <span>Solve the analogy: </span><br/><br/>
        <strong > King is to man, as queen is to ______. </strong><br/><br/>
        Yes! You probably have this right. The answer is woman. 
    </p>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <p>

        How does this work? 

        1. Find the difference between king and man.
        2. Apply that difference to queen.
        3. Find the closest words around that last point.

        <br/>
        That process is graphed below:
    </p>

    <Scatter label="Your Word Embeddings Chart" data={data}/>
</Lesson>
