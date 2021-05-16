import { a11yLight as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'

import { InputForm } from '../components/molecules/Form'
import { findSynonyms, iSynonym } from '../scripts/nlp'
import { Scatter } from '../components/atoms/Chart'
import { Lesson } from '../components/cells/Lesson'
import { antonymsData } from '../data/antonyms'
import { synonymsData } from '../data/synonyms'
import { Subtitle } from '../components/atoms'
import { iModels } from '../types/ai'

import amplitude from 'amplitude-js'
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


interface iSynonyms {next():void, models:iModels, user?:User}
const title = 'Finding Synonyms'
export const Synonyms = ({next, models, user}:iSynonyms) => {
    const [ synonyms, setSynonyms ] = useState<iSynonym[]>([])
    const [ computing, setComputing ] = useState(false)
    const getSynonyms = async(synonym:string) => {
        setSynonyms([])
        setComputing(true)

        try{
            const synonyms = await findSynonyms({ word:synonym, models, user })
            setSynonyms(synonyms.filter((_, i) => i < 5))
        } catch(e) { console.log(e) }

        setComputing(false)
        amplitude.getInstance().logEvent('GET_SYNONYMS', { synonym, synonyms })
    } 

    return <Lesson title={title} next={next}>
        <p>
            Finding synonyms is one of the simplest applications of word embeddings. 
            A synonym is a word that means exactly or nearly the same as another word. 
            And since word embeddings are numerical representations of a word's meaning. 
            To find the synonyms, we only need to <strong>find the vectors that are closest</strong> to the word.            
        </p>

        <Scatter label="Synonyms of Great"   data={synonymsData} />
        <p>
            The first step to finding synonyms is to <strong>select a distance metric</strong> to compare the closeness, or similarity, between two vectors. 
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
            Another common distance metric used is the <strong>absolute value</strong>. In TypeScript, this is how to measure the absolute value distance:
        </p>

        <Subtitle text={"Example: Absolute Distance"} style={{textAlign:'center', marginTop:'2rem'}}/>
        <SyntaxHighlighter language="typescript" style={codeStyle}>
            {codeString}
        </SyntaxHighlighter>

        <p>
            With that knowledge, finding the synonym is trivial. One only has to find the words that have the minimum distance. 
            <strong> Use the input box below to search for synonyms</strong> based on TensorflowJS word embeddings:
        </p>

        <Subtitle text="Excersice: Find The Synonyms" style={{textAlign:'center'}}/>
        <InputForm placeholder={'Search the Synonyms of a word...'} submit={getSynonyms} />

        { 
            synonyms.length 
            ? 
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
            :  computing
                ?   <p style={{textAlign:'center'}}> <strong> Computing...</strong> </p>
                :   <div/>
        }


        <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

        <p>
            Interestingly, it is also possible to <strong>find antonyms</strong> using word embeddings. 
            The only difference is finding the vectors that maximize the distance.
        </p>

        <Scatter label="Antonyms of Great" data={antonymsData} /> 
    </Lesson>
}
