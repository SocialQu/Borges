import { TextAreaForm } from '../components/molecules/Form'
import { Lesson } from "../components/cells/Lesson"
import { Scatter } from '../components/atoms/Chart'
import { Subtitle } from '../components/atoms'
import { classifyText } from '../scripts/nlp'
import { iModels } from '../types/ai'
import { User } from 'realm-web'
import { useState } from 'react'

const title = 'Topic Classification'
interface iTopicClassification {user:User, models:iModels, next():void}
export const TopicClassification = ({next, models, user}:iTopicClassification) => {
    const [ topics, setTopics ] = useState<string[]>()

    const getTopics = async(text:string) => {
        const topics = await classifyText({ text, models, user })
        setTopics(topics.map(({ topic }) => topic))
    } 


    return <Lesson title={title} next={next}>
        <p> This is chart that maps the average word embeddings for texts in different topics:</p>

        <Subtitle text="Topic's Position"/>
        <Scatter data={[{name:'Startups', x:1, y:2}, {name:'VC', x:3, y:4}]} />

        <p>
            The process of finding the topic of a text, sentence or even a word is very similar to finding the synonyms. 
            Its about minizing the distance from the word embeddings of the text you want to classify to the topics center. 
            Try it out, input a text or sentence and find the likelihood the text find a topic.
        </p>

        <TextAreaForm label="Classify a Text" submit={getTopics}/>
        <ul> { topics?.map((topic)=> <li> { topic } </li> ) } </ul>

        <p>
            This process can be extrapolated to other tasks like sentiment analysis, and it works with labeled data. 
            <strong>Question:</strong> How would you classify text using unsupervised learning?
        </p>
    </Lesson>
}
