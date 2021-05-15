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

const topicExamples = [
    { name: 'Startups', x: 0.013340203804803313, y: -0.1089692365298846 },
    { name: 'Artificial Intelligence', x: -0.1936355040978913, y: 0.16896265953332448 },
    { name: 'Business', x: 0.08264398617441869, y: -0.050645064002418395 },
    { name: 'Neuroscience', x: 0.1512825849619681, y: 0.16040801941022778 },
    { name: 'Leadership', x: 0.03403361342231642, y: -0.15403125204165727 },
    { name: 'Creativity', x: 0.015511968193042984, y: -0.08164472685218276 },
    { name: 'Future', x: 0.13374767823049852, y: 0.14803781749738984 },
    { name: 'Machine Learning', x: -0.2604543610486019, y: 0.15816953176600418 },
    { name: 'Marketing', x: -0.04108333025970345, y: -0.1820009647365572 },
    { name: 'Money', x: 0.1781931380455441, y: -0.05125952880311897 },
    { name: 'History', x: 0.20528446892772023, y: 0.11026244672327719 },
    { name: 'Science', x: 0.1443393579641293, y: 0.16012786363436346 },
    { name: 'Data Science', x: -0.2437326711645277, y: 0.14588355081082074 },
    { name: 'Economy', x: 0.21359695360086944, y: 0.027308390454593757 },
    { name: 'Writing', x: 0.013289173075030285, y: -0.18527220234507477 },
    { name: 'Product Management', x: -0.18939671932664923, y: -0.09918245686819381 },
    { name: 'Venture Capital', x: -0.04948730471639694, y: -0.057971934481120556 },
    { name: 'Cities', x: 0.1426976752282963, y: 0.09183884450071836 },
    { name: 'World', x: 0.2670517313708766, y: 0.09965132374407018 },
    { name: 'Software Engineering', x: -0.2523463601781279, y: 0.018352343108732103 },
    { name: 'Blockchain', x: -0.04340171936332786, y: 0.14718719582087073 },
    { name: 'Design', x: -0.12693020273578345, y: -0.030773742314242774 },
    { name: 'Sports', x: 0.23740274085220672, y: 0.07022247078508662 },
    { name: 'Books', x: 0.14073574610214054, y: -0.03526400870809505 },
    { name: 'Social Media', x: 0.0942347471483537, y: -0.05025451857071428 },
    { name: 'Culture', x: 0.22069752532208867, y: -0.007208311420192056 },
    { name: 'Javascript', x: -0.23762473366519032, y: 0.09551929453273014 },
    { name: 'UX', x: -0.16211518503311287, y: -0.11765679582065482 },
    { name: 'Math', x: -0.11352106292074458, y: 0.18932889985704612 },
    { name: 'Programming', x: -0.2629372755080102, y: 0.070290009972576 },
    { name: 'Technology', x: -0.025902171680198628, y: 0.08729953374588978 },
    { name: 'Visual Design', x: -0.1901826038901647, y: -0.07111781627228549 },
    { name: 'Cybersecurity', x: -0.17117182667286635, y: 0.06092183033273122 },
    { name: 'Work', x: 0.0040847167592627685, y: -0.10027909775609745 },
    { name: 'Cryptocurrency', x: 0.02984584613549426, y: 0.128067933923006 },
    { name: 'Lifestyle', x: 0.16752829180355575, y: -0.09442935263162763 },
    { name: 'Space', x: 0.15637898459873992, y: 0.28979664990436405 },
    { name: 'Media', x: 0.15250134173430807, y: 0.007159771106355286 },
    { name: 'Language', x: 0.08363114585217049, y: 0.034025110626317724 },
    { name: 'Society', x: 0.24324642201566551, y: 0.0071548075356962 },
    { name: 'Style', x: 0.20138630302152313, y: 0.07021359327712587 },
    { name: 'Podcasts', x: -0.05675664801477344, y: -0.14887462491552084 },
    { name: 'Transportation', x: 0.07270635800552912, y: 0.10077433942707699 },
    { name: 'Mental Health', x: 0.1922398093541709, y: -0.11827608822818002 },
    { name: 'Sexuality', x: 0.16940520763403424, y: -0.013402574753000229 },
    { name: 'Health', x: 0.21626953416153188, y: 0.06228558385314924 },
    { name: 'Self', x: 0.15009016611341353, y: -0.14516462240272623 },
    { name: 'Travel', x: 0.2020639581385505, y: 0.008592945220373027 },
    { name: 'Relationships', x: 0.20382075537633826, y: -0.11864420092891959 },
    { name: 'Education', x: 0.10702996468865965, y: -0.02644307304633371 },
    { name: 'Equality', x: 0.23975142036275698, y: 0.03306668397944969 },
    { name: 'Justice', x: 0.2651012691312156, y: 0.053023441776299064 },
    { name: 'Film', x: 0.16907129435000687, y: -0.00030705886341953305 },
    { name: 'Art', x: 0.12510700733866392, y: 0.07215013856293591 },
    { name: 'Music', x: 0.2221296776091377, y: -0.012386542140523779 },
    { name: 'Food', x: 0.1222132181513085, y: -0.04413328346216902 },
    { name: 'Digital Life', x: -0.002312709210295757, y: -0.03103274303623727 },
    { name: 'Psychology', x: 0.11198638063705071, y: -0.10879193702867948 },
    { name: 'Race', x: 0.25632689345139925, y: 0.03807403828765117 },
    { name: 'Politics', x: 0.26736363973830685, y: 0.07952531228906255 },
    { name: 'Philosophy', x: 0.181594790726131, y: 0.02192790421959939 },
    { name: 'Family', x: 0.24680055441466078, y: -0.09636462077744101 },
    { name: 'Photography', x: 0.05482941140453423, y: 0.02153227940666391 },
    { name: 'Gadgets', x: -0.18260158841491914, y: -0.027269046857995204 },
    { name: 'Accessibility', x: 0.04243119565290996, y: -0.1368729425006573 },
    { name: 'iOS Dev', x: -0.12322391839955193, y: 0.05482329129685742 },
    { name: 'Disability', x: 0.14529828647160184, y: -0.08529751940776897 },
    { name: 'Parenting', x: 0.22902619239138303, y: -0.08352308606369316 },
    { name: 'Immigration', x: 0.2841748517824406, y: 0.15302835446469104 },
    { name: 'Pets', x: 0.2007179737810459, y: -0.06273988068453029 },
    { name: 'Poetry', x: 0.18922176836722482, y: -0.0008373177436123155 },
    { name: 'Fiction', x: 0.19430010874127393, y: 0.0031271128330759633 },
    { name: 'Humor', x: 0.12096139919242652, y: -0.07905842926720037 },
    { name: 'Comics', x: 0.16876900619379778, y: -0.06654797509995795 },
    { name: 'Beauty', x: 0.2346792720835778, y: -0.06590742997928652 },
    { name: 'Gaming', x: 0.0555437324421158, y: 0.03289751080074143 },
    { name: 'Religion', x: 0.2166256511679486, y: 0.07778413207917224 },
    { name: 'TV', x: 0.2247577473713745, y: 0.039518562012968585 },
    { name: 'True Crime', x: 0.3215617843318865, y: 0.12758289651199828 },
]

const title = 'Application: Topic Classification'
interface iTopicClassification {user?:User, models:iModels, next():void}
export const TopicClassification = ({next, models, user}:iTopicClassification) => {
    const [ topics, setTopics ] = useState<iTopic[]>([])

    const getTopics = async(text:string) => {
        const topics = await classifyText({ text, models, user })
        setTopics(topics)
    } 


    return <Lesson title={title} titleStyle={{width:740, marginLeft:-10}} next={next}>
        <Scatter label={""} data={[topicExamples]} />

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
