import { TextAreaForm } from '../components/molecules/Form'
import { Lesson } from "../components/cells/Lesson"
import { Chart } from '../components/atoms'

const title = 'Topic Classification'
interface iTopicClassification {next():void}
export const TopicClassification = ({next}:iTopicClassification) => <Lesson title={title} next={next}>
    <p> This is chart that maps the average word embeddings for texts in different topics:</p>

    <Chart title="Topic's Position" />

    <p>
        The process of finding the topic of a text, sentence or even a word is very similar to finding the synonyms. 
        Its about minizing the distance from the word embeddings of the text you want to classify to the topics center. 
        Try it out, input a text or sentence and find the likelihood the text find a topic.
    </p>

    <TextAreaForm label="Classify a Text"/>

    <p>
        This process can be extrapolated to other tasks like sentiment analysis, and it works with labeled data. 
        <strong>Question:</strong> How would you classify text using unsupervised learning?
    </p>

</Lesson>







