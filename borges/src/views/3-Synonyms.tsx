import { a11yLight as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'

import { InputForm } from '../components/molecules/Form'
import { findSynonyms, iSynonym } from '../scripts/nlp'
import { Scatter } from '../components/atoms/Chart'
import { Lesson } from '../components/cells/Lesson'
import { Subtitle } from '../components/atoms'
import { iModels } from '../types/ai'
import { User } from 'realm-web'
import { useState } from 'react'


const codeString = `/* Similarity: get the absolute distance of two vectors */
const similarity = (a:number[], b: number[]) => {

    // Validate the vectors have the same length.
    if(a.length !== b.length) return Infinity
    
    // Sum the absolute difference for each dimension.
    const delta = a.reduce((d, i, idx) => 
        d + Math.abs(i - b[idx])
    , 0)
    
    // Return a proxy of a vector's similarity.
    return delta
}
    
similarity([3,4], [1,2]) // Returns 4
// Math.abs(3–1) + Math.abs(4–2) = 2+ 2 = 4

similarity([3,4], [1,6]) // Also returns 4
// Math.abs(3–1) + Math.abs(4–6) = 2 + 2 = 4

// 3D Vectors Distance
similarity([3,4,5], [4,6,8]) // Returns 6
// Math.abs(3–4) + Math.abs(4–6) + Math.abs(5–8) = 6
`

const synonymsExamples = [[
    { name:'great', x:0.2678875504042883, y:0.08622527515564886 },
    { name:'fantastic', x:0.23823606303144115, y:0.14487491040643397 },
    { name:'awesome', x:0.22066810318463187, y:0.20261349745629678 },
    { name:'fine', x:0.32807182054310924, y:0.0062455673958450395 },
    { name:'adequate', x:0.26315661687921327, y:-0.032619549232111696 },
    { name:'acceptable', x:0.2482874375890997, y:-0.006738511966766716 },
    { name:'superb', x:0.06292865693982877, y:-0.09312185321937903 },
    // { name:'satisfactory', x:-0.037229655424222415, y:-0.035617290715822925 },
    { name: 'terrific', x: 0.1475249097626694, y:0.02264397856360343 },
    { name: 'outstanding', x:0.15243431754742934, y:0.13212771206983165},
    { name: 'marvelous', x:0.1121273842498986, y:-0.025707189025264178 },
    { name: 'worthy', x:0.2489415956286796, y:0.08810669422764673 },
    { name: 'swell', x:0.23383745699224234, y:-0.037010913972349735 }
],  [
    { name:'good', x:0.3147067813665447, y:0.04985350758041785 },
]]


interface iSynonyms {next():void, models:iModels, user?:User}
const title = 'Application: Finding Synonyms'
export const Synonyms = ({next, models, user}:iSynonyms) => {
    const [ synonyms, setSynonyms ] = useState<iSynonym[]>([])
    const getSynonyms = async(synonym:string) => {
        const synonyms = await findSynonyms({ word:synonym, models, user })
        setSynonyms(synonyms.filter((_, i) => i < 5))
    } 

    return <Lesson title={title} next={next}>
        <p>
            Finding synonyms is one of the simplest applications of word embeddings. 
            A synonym is a word that means exactly or nearly the same as another word. 
            And since word embeddings are numerical representations of a word's meaning. 
            To find the synonyms, we only need to find the vectors that are closest to the word.            
        </p>

        <Scatter
            label="Synonyms of Good"  
            data={synonymsExamples}
        /> 

        <p>
            The first step to finding synonyms is selecting a distance metric to compare the closeness, or similarity, between two vectors. 
            One of the most common metrics is the Euclidean distance that sums the squared difference across every vector's dimension:
        </p>

        <div style={{textAlign:'center', marginBottom:'2rem'}}>
            <Subtitle text={"Euclidean Distance Calculation"} style={{marginTop:'2rem'}}/>
            <img 
                alt="Euclidean Distance Calculation"
                src="https://www.tutorialexample.com/wp-content/uploads/2020/05/Euclidean-distance-in-tensorflow.png" 
            />
        </div>

        <p>
            Another common distance metric used is the absolute value. In TypeScript, this is how to measure the absolute value distance:
        </p>

        <Subtitle text={"Example: Absolute Distance"} style={{textAlign:'center', marginTop:'2rem'}}/>
        <SyntaxHighlighter language="typescript" style={codeStyle}>
            {codeString}
        </SyntaxHighlighter>

        <p>
            With that knowledge, finding the synonym is trivial. One only has to find the words that have the minimum distance. 
            Use the input box below to search for synonyms based on TensorflowJS word embeddings:
        </p>

        <Subtitle text="Excersice: Find The Synonyms" style={{textAlign:'center'}}/>
        <InputForm placeholder={'Search the Synonyms of a word...'} submit={getSynonyms} />

        <table className="table" style={{textAlign:'center'}}>
            <thead>
                <tr> 
                    <th> Synonym </th>
                    <th> Similarity </th>
                </tr>
            </thead>

            <tbody>
                { 
                    synonyms.map(({ word, similarity }, i) => 
                        <tr>
                            <td> { word } </td>
                            <td> <strong>{ similarity }%</strong> </td>
                        </tr>
                    )
                }
            </tbody>
        </table>


        <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

        <p>
            Interestingly, it is also possible to find antonyms using word embeddings. 
            The only difference is finding the vectors that maximize the distance.
        </p>

        <Scatter 
            label="Antonyms of Good"
            data={[[{name:'Bad', x:1, y:2}, {name:'Worst', x:3, y:4}]]} 
        /> 
    </Lesson>
}
