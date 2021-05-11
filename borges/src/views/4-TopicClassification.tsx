import { TextAreaForm } from '../components/molecules/Form'
import { Lesson } from "../components/cells/Lesson"
import { Scatter } from '../components/atoms/Chart'
import { classifyText } from '../scripts/nlp'
import { iModels } from '../types/ai'
import { User } from 'realm-web'
import { useState } from 'react'

const title = 'Application: Topic Classification'
interface iTopicClassification {user:User, models:iModels, next():void}
export const TopicClassification = ({next, models, user}:iTopicClassification) => {
    const [ topics, setTopics ] = useState<string[]>()

    const getTopics = async(text:string) => {
        const topics = await classifyText({ text, models, user })
        setTopics(topics.map(({ topic }) => topic))
    } 


    return <Lesson title={title} titleStyle={{width:740, marginLeft:-10}} next={next}>
        <p> This is chart that maps the average word embeddings for texts in different topics:</p>

        <Scatter
            label={"Topic's Position"} 
            data={[{name:'Startups', x:1, y:2}, {name:'VC', x:3, y:4}]} 
        />

        <p>
            The process of finding the topic of a text, sentence or even a word is very similar to finding the synonyms. 
            Its about minizing the distance from the word embeddings of the text you want to classify to the topics center. 
            Try it out, input a text or sentence and find the likelihood the text find a topic.
        </p>

        <TextAreaForm 
            submit={getTopics} 
            label="Excersice: Classify a Text" 
            placeholder={'Drop a text or sentence to find its related topics.'}
        />
        <ul> { topics?.map((topic)=> <li> { topic } </li> ) } </ul>

        <p>
            This process can be extrapolated to other tasks like sentiment analysis, and it works with labeled data. <br/><br/>
            <strong> Reflection:</strong> <i>How would you classify texts with unsupervised learning?</i>
        </p>
    </Lesson>
}
