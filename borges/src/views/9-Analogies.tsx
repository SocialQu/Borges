import { a11yLight as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'

import { Subtitle, Scatter } from '../components/atoms'
import { Lesson } from "../components/cells/Lesson"

const data = [
    {name:'King', x:5, y:5}, 
    {name:'Man', x:4, y:4},
    {name:'Woman', x:2, y:2},
    {name:'Queen', x:3, y:3}
]

const codeString = `/* 
* Let wordEmbeddings be a dictionary,
* with the word embedding vectors.
*/ 

// Get the word embedding vectors for king, man, and queen.
const king = wordEmbeddings['king']
const man = wordEmbeddings['man']
const queen = wordEmbeddings['queen']

// Get the distance between king & man:
const delta = distance(king, man)

// The solution to the analogy is located at the same distance,
// but starting from the queen's vector location.
const solutionLocation = distance(queen, delta)

// Find the words closest to the solution's location.
const solution = findClosest(solutionLocation)
`

const title = 'Application: Solving Analogies'
interface iAnalogies {next():void}
export const Analogies = ({next}:iAnalogies) => <Lesson title={title} next={next}>
    <p>
        Adding and subtracting word embedding has an interesting and surprising application: solving analogies. 
        Traditionally, analogies are used to measure the reasoning and language skills of students. 
        Today, they also evaluate the accuracy of word embeddings. Consider the following analogy: <br/><br/>

        <strong > King is to man, as queen is to ______. </strong><br/><br/>

        The idea to solve this problem is to find the word that has the same distance to "queen" as "man" has to "king." 
        This is how it looks with vectors:
    </p>

    <Subtitle text={"Solivng the analogy"} style={{textAlign:'center', marginTop:'2rem'}}/>
    <SyntaxHighlighter language="typescript" style={codeStyle}>
        {codeString}
    </SyntaxHighlighter>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>


    <p>
        The word embeddings dictionary can be located in a database or loaded from a package. 
        The second option is common in Python; 
        a third option is computing the word embeddings in real-time from the browser using TensorflowJS. <br/><br/>

        For computing the distance, you can use the similarity function we derived in the synonyms section. 
        And if you want to learn how to find the closest vectors, you may be interested in reading the tutorial: 
        How to build a text recommendation engine.
    </p>

    <Scatter label="Visual Representation of the Queen Analogy" data={data} />
</Lesson>
