import { InputForm } from '../components/molecules/Form'
import { Media, Subtitle } from '../components/atoms'
import { Scatter } from '../components/atoms/Chart'
import { Lesson } from '../components/cells/Lesson'
import { findSynonyms } from '../scripts/nlp'
import { iModels } from '../types/ai'
import { User } from 'realm-web'
import { useState } from 'react'


interface iSynonyms {next():void, models:iModels, user:User}
const title = 'Application: Finding Synonyms'
export const Synonyms = ({next, models, user}:iSynonyms) => {
    const [ synonyms, setSynonyms ] = useState<string[]>()
    const getSynonyms = async(synonym:string) => {
        const synonyms = await findSynonyms({ word:synonym, models, user })
        setSynonyms(synonyms.map(({ word }) => word))
    } 

    return <Lesson title={title} next={next}>
        <p>
            Finding a synonym is one of the simplest applications of word embeddings. 
            According to Google a synonym is a word or phrase that means exactly or nearly the same as another word or phrase. 
            And since word embeddings are numerical representations of the meaning of a word we only need to find the words 
            that are near the word we want to find a synonym.
        </p>

        <Subtitle text="Synonyms of Good"/>
        <Scatter  data={[{name:'Great', x:1, y:2}, {name:'Good', x:3, y:4}]}/> 

        <p>
            To measure the distance between two vectors we need to select a metric. 
            One of the most common is the Euclidean distance that sums the squared difference across every dimension
        </p>

        <Media src="https://www.tutorialexample.com/wp-content/uploads/2020/05/Euclidean-distance-in-tensorflow.png" type="img"/>


        <p>
            Another common distances includes the absolute value distance. In typescript the absolute value can be meassured as follows:
        </p>

        <div className={'code'}>
            // Compute the absolute distance for two vectors <br/>
            const similarity = (a:number[], b: number[]) =&gt; &#123; <br/>
                // Only compute distance for same length vectors. <br/>
                if(center.length !== embedding.length) return Infinity <br/>

                const difference = a.reduce((d, i, idx) =&gt; d + Math.abs(i - b[idx]), 0) <br/>
                return difference <br/>
            &#125;

            <br/><br/>

            similarity([3,4], [4,5]) =&gt; 2  <br/>
            // Math.abs(3-4) + Math.abs(4-5) = 1 + 1 = 2 <br/>

            <br/>


            similarity([3,4], [4,6]) =&gt; 3 <br/>
            similarity([3,4], [5,6]) =&gt; 4 <br/>
            similarity([3,4], [1,6]) =&gt; 4 <br/>
            // Math.abs(3-1) + Math.abs(4-6) = 2 + 2 = 4 <br/>

            <br/>

            similarity([3,4,5], [4,5,6]) =&gt; 3 <br/>
            similarity([3,4,5], [4,6,8]) =&gt; 7 <br/>
            // Math.abs(3-4) + Math.abs(4-6) + Math.abs(5-8) = 1 + 2 + 3 = 6 <br/>
        </div>

        <p>
            With that knowledge the process of finding a synonym is trivial. 
            One only has to find the words that have the minimum distance to the word for which we are finding synonyms. 
            Use the input box below to search for synonyms based on TensorflowJS word embeddings:
        </p>

        <Subtitle text="Excersice: Find The Synonyms"/>
        <InputForm placeholder={'Find the Synonyms.'} submit={getSynonyms} />

        <ul> { synonyms?.map((synonym)=> <li> { synonym } </li> ) } </ul>

        <p>
            Interestingly, it is also possible to find Antonyms with word embeddings, 
            the only difference is to find the words maximize that maximize the  distance to the intended word.
        </p>

        <Subtitle text="Antonyms of Good"/>
        <Scatter data={[{name:'Bad', x:1, y:2}, {name:'Worst', x:3, y:4}]} /> 
    </Lesson>
}
