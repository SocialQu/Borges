import { Form, TextAreaForm } from '../components/molecules/Form'
import { Lesson } from "../components/cells/Lesson"
import { Chart } from '../components/atoms'

const title = 'Application: Detecting Biasis'
interface iBiasis {next():void}
export const Biasis = ({next}:iBiasis) => <Lesson title={title} next={next}>
    <p>
        A more useful application of word embeddings is detecting biasis. 
        The concepts are similar, find two opposites like man and woman, and measure how different are closer to each other. 
        For example, in terms of jobs we can find which are more commonly held by a man than a woman and visceversa. 
    </p>

    <p>
        Similar concepts can be made with Sentiment Analysis, and measure if there is a bias against a particular group or person. 
        And it can also be used to moderate content: if we detect that nocive comments usually fall within a particular region of the vector 
        space composed by the word embeddings, we can flag that content and review it manually.
    </p>

    <Chart title="Gender Names"/>

    <p>
        Unfortunately, in the chart above you can see how positive words are correlated with male names, 
        while negative words tend to be more correlated with female names. 

        Please pause for a moment and share what can you do to close and vanish this gap.
    </p>

    <TextAreaForm label={"Gender gap solutions"}/>

    <Form label={"You can search for more biases, in word embeddings with the form below."} />
</Lesson>
