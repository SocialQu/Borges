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
    { name:'good', x:0.3147067813665447, y:0.04985350758041785 },
    { name:'fantastic', x:0.23823606303144115, y:0.14487491040643397 },
    { name:'awesome', x:0.22066810318463187, y:0.20261349745629678 },
    { name:'fine', x:0.32807182054310924, y:0.0062455673958450395 },
    { name:'adequate', x:0.26315661687921327, y:-0.032619549232111696 },
    { name:'acceptable', x:0.2482874375890997, y:-0.006738511966766716 },
    { name: 'excellent', x: 0.26020028378898796, y: 0.1795464676336728 },
    { name: 'swell', x:0.23383745699224234, y:-0.037010913972349735 },
    { name: 'fantastic', x: 0.23823603648221459, y: 0.14487489320898253 }
],  [
    { name:'great', x:0.2678875504042883, y:0.08622527515564886 },
]]

const antonymsExamples = [[
    { name: 'bad', x: 0.2247337151798657, y: -0.11902389519516254 },
    { name: 'rotten', x: -0.04707589407404858, y: -0.15178908091667198 },
    { name: 'miserable', x: -0.08413305746207816, y: -0.13274327483101728 },
    { name: 'frightful', x: 0.008293154123255823, y: -0.15911453133808431 },
    { name: 'second-class', x: -0.1414805424730524, y: -0.04281164151585502 },
    { name: 'duff', x: 0.011557630261837062, y: -0.16281481535096506 },
    { name: 'deficient', x: -0.07007090504812882, y: -0.07098406941306425 }, 
    { name: 'inferior', x: 0.002700150980754013, y: -0.12775784867592999 }, 
    { name: 'negligent', x: -0.07887365876988503, y: 0.015448157565509175 },
    { name: 'inadequate', x: 0.036472839330414286, y: -0.08661654543022536 },
    { name: 'deplorable', x: -0.002949522025066287, y: -0.037800211607624444 },
    { name: 'atrocious', x: 0.02963134841897481, y: -0.0617553968908285 },
    { name: 'poor', x: 0.13351667691892236, y: -0.12166834932825972 }
],  [
    { name: 'good', x: 0.31470691618303653, y: 0.049853500943808554 },
    { name:'great', x:0.2678875504042883, y:0.08622527515564886 },
    { name:'fantastic', x:0.23823606303144115, y:0.14487491040643397 },
    { name:'awesome', x:0.22066810318463187, y:0.20261349745629678 },
    { name:'fine', x:0.32807182054310924, y:0.0062455673958450395 },
    { name:'adequate', x:0.26315661687921327, y:-0.032619549232111696 },
    { name:'acceptable', x:0.2482874375890997, y:-0.006738511966766716 },
    { name: 'OK', x: 0.28097371969778423, y: 0.126773494502087 },
    { name: 'excellent', x: 0.26020028378898796, y: 0.1795464676336728 },
    { name: 'worthy', x:0.2489415956286796, y:0.08810669422764673 },
    { name: 'swell', x:0.23383745699224234, y:-0.037010913972349735 }
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
            label="Synonyms of Great"  
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
            label="Antonyms of Great"
            data={antonymsExamples} 
        /> 
    </Lesson>
}
