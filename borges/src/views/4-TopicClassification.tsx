import { a11yLight as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'

import { TextAreaForm } from '../components/molecules/Form'
import { Scatter, Subtitle } from '../components/atoms'
import { classifyText, iTopic } from '../scripts/nlp'
import { Lesson } from "../components/cells/Lesson"
import { iModels } from '../types/ai'
import { User } from 'realm-web'
import { useState } from 'react'


const codeString = `/* 
 * getCenter: find the average the position of a matrix of 
 * word embeddings to find the "center" of a document. 
 */
export const getCenter = (vectors: number[][]) => {
  const dimensions = vectors[0].length 
  const dimensionArr = [...Array(dimensions)]
 
  // Iterate through each dimension.
  const center = dimensionArr.map((_ , idx) => {
   
    // Sum the value of the dimension (idx) for each vector.
    const dimensionSum = vectors.reduce((d,i) => d + i[idx], 0)
    const dimensionAvg = dimensionSum/vectors.length
   
    // Return the average for each dimension.
    return dimensionAvg
  })

  // Return a vector with the same shape, and averaging values.
  return center
}

getCenter([[1,2], [3,4]]) // Returns [2,3]
// [(1+3)/2, (2+4)/2] = [4/2, 6/2] = [2,3]

getCenter([[2,3,3], [4,4,-1], [0,2,4]]) // Returns [2,3,1]
// [(2+4+0)/3, (3+4+2)/3, (3-1+4)/3] = [2,3,1]
`

const title = 'Application: Topic Classification'
interface iTopicClassification {user?:User, models:iModels, next():void}
export const TopicClassification = ({next, models, user}:iTopicClassification) => {
    const [ topics, setTopics ] = useState<iTopic[]>([])

    const getTopics = async(text:string) => {
        const topics = await classifyText({ text, models, user })
        setTopics(topics)
    } 


    return <Lesson title={title} titleStyle={{width:740, marginLeft:-10}} next={next}>
        <Scatter
            label={""} 
            data={[{name:'Startups', x:1, y:2}, {name:'VC', x:3, y:4}]} 
        />

        <p>
            Word embeddings and distance metrics are also useful to label documents by topic. 
            The process starts with a labeled dataset of documents classified by topics. 
            Then, transform the document's content into word embeddings and average the position of each vector:
        </p>

        <Subtitle text={"Finding the average word embeddings of a document:"} style={{textAlign:'center', marginTop:'2rem'}}/>
        <SyntaxHighlighter language="typescript" style={codeStyle}>
            {codeString}
        </SyntaxHighlighter>

        <p>
            <i>
                We can think about the center of a document as the document's embedding: 
                it is the numerical representation of its content.
            </i>
        </p>

        <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>


        <p>
            The next step is to derive the topic's center. 
            In a similar process, we find for every topic the average position of its documents. 
            Finally, when we want to classify an unlabeled document, 
            we can transform its content into a vectorial representation and use the distance metric to find the closest topic.
            Try it out, input a text or sentence to classify it by topic.
        </p>

        <TextAreaForm 
            submit={getTopics} 
            label="Excersice: Classify a Text" 
            placeholder={'Drop a text or sentence to find its related topics.'}
        />

        <table className="table" style={{textAlign:'center'}}>
            <thead>
                <tr> 
                    <th> Synonym </th>
                    <th> Similarity </th>
                </tr>
            </thead>

            <tbody>
                { 
                    topics.map(({ topic, similarity }, i) => 
                        <tr>
                            <td> { topic } </td>
                            <td> <strong>{ similarity }%</strong> </td>
                        </tr>
                    )
                }
            </tbody>
        </table>


        <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>
        <p>
            <strong> Reflection:</strong> 
            <i>How would you classify documents using exclusively unlabeled data? That is with unsupervised learning.</i>
        </p>
    </Lesson>
}
