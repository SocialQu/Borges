import { Lesson } from "../components/cells/Lesson"
import { Scatter } from "../components/atoms/Chart"
import { Subtitle } from '../components/atoms'

const data = [
    {name:'King', x:5, y:5}, 
    {name:'Man', x:4, y:4},
    {name:'Woman', x:2, y:2},
    {name:'Queen', x:3, y:3}
]

const title = 'Application: Solving the Analogy'
interface iAnalogies {next():void}
export const Analogies = ({next}:iAnalogies) => <Lesson title={title} next={next}>
    <p>
        Congratulations! You now know how to train a simple word embeddings model. 
        The next application uses also basic vector operations to solve a slightly more difficult problem. Finding an analogy:
    </p>

    <p>
        <strong> King is to man, as queen is to ______. </strong>

        Yes! You probably have this right. The answer is woman. How does this work? 

        1. Find the difference between king and man.
        2. Apply that difference to queen.
        3. Find the closest words around that last point.

        <br/>
        That process is graphed below:
    </p>

    <Subtitle text="Your Word Embeddings Chart"/>
    <Scatter data={data}/>
</Lesson>
