import { Lesson } from "../components/cells/Lesson"
import { Chart } from '../components/atoms'
import { Form } from '../components/molecules/Form'

const title = 'Application: Solving the Analogy'
export const Analogies = () => <Lesson title={title} next={() => {}}>
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

    <Chart title="Analogy Chart"/>

    <Form label={'Find the Analogy.'}/>
</Lesson>
