import { a11yLight as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'

import { Subtitle, Scatter } from '../components/atoms'
import { Lesson } from "../components/cells/Lesson"

const data = [[
    { name: 'Berlin', x: -0.26281681884963604, y: -0.0774401642129566 },
    { name: 'Germany', x: -0.22747827860859376, y: -0.03650822617169154 },
    { name: 'Paris', x: -0.2499388375129411, y: -0.18383800287303134 },
    { name: 'France', x: -0.20136561814195172, y: -0.12470961922914306 }
],  [ { name: 'Solution Location', x:-0.20, y:-0.14}]]

const codeString = `// Measure the distance between 2 vectors.
const distance = (a:number[], b:number[]) =>
    a.map((i, idx) => i - b[idx]
)

// Get the word embedding vectors for Berlin, Germany, & Paris
const berlin = wordEmbeddings['Berlin'] // [-0.26, -0.07]
const germany = wordEmbeddings['Germany'] // [-0.22, -0.03]
const paris = wordEmbeddings['Paris'] // [-0.24, -0.18]

// Get the distance between Berlin & Germnay:
const delta = distance(berlin, germany) //  [-0.4, -0.4]

// The solution to the analogy is located at the same distance,
// but starting from "Paris's" vector location.
const location = distance(paris, delta) // [-0.20, -0.14]

// Find the words closest to the solution's location.
const france = findClosest(solutionLocation)
`

const recommendationLink = 'https://medium.com/geekculture/how-to-develop-a-text-recommendation-engine-99d3b46effdb?sk=508c65e2139bfdfbd8043b2090ee1bd7'
const title = 'Solving Analogies'
interface iAnalogies {next():void}
export const Analogies = ({next}:iAnalogies) => <Lesson title={title} next={next}>
    <p>
        Adding and subtracting word embedding has an interesting and surprising application: solving analogies. 
        Traditionally, analogies are used to measure the reasoning and language skills of students. 
        Today, they can also <strong>evaluate the accuracy of word embeddings</strong>. Consider the following analogy:
    </p>

    <p style={{textAlign:'center'}}>
        <strong> Berlin is to Germany, as Paris is to ______. </strong>
    </p>

    <p>
        The idea to solve this problem is to find the word that <strong>has the same distance</strong> to "Paris" as "Germany" has to "Berlin." 
        This is how it looks with vectors:
    </p>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>
    <Subtitle text={"Solivng the analogy"} style={{textAlign:'center', marginTop:'2rem'}}/>

    <SyntaxHighlighter language="typescript" style={codeStyle}>
        {codeString}
    </SyntaxHighlighter>

    <p>
        The word embeddings dictionary can be located in a database or loaded from a package, 
        the second option is common in Python. 
        A third option is to <strong>compute the word embeddings in real-time</strong> from the browser using TensorflowJS. <br/><br/>

        If you are interested in learning how to find the closest vectors, you might find interesting: 
        <a href={recommendationLink}><strong> How to build a text recommendation engine.</strong></a>
    </p>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>
    <Scatter label="Visual Representation of the Paris Analogy" data={data} />
</Lesson>
