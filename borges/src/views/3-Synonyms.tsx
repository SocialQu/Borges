import { InputForm } from '../components/molecules/Form'
import { Lesson } from "../components/cells/Lesson"
import { Chart, Media } from '../components/atoms'

const title = 'Application: Finding Synonyms'
export const WordEmbeddings = () => <Lesson title={title} next={() => {}}>
    <p>
        Finding a synonym is one of the simplest applications of word embeddings. 
        According to Google a synonym is a word or phrase that means exactly or nearly the same as another word or phrase. 
        And since word embeddings are numerical representations of the meaning of a word we only need to find the words 
        that are near the word we want to find a synonym.
    </p>

    <Chart title="Synonyms of Good"/> 

    <p>
        To measure the distance between two vectors we need to select a metric. 
        One of the most common is the Euclidean distance that sums the squared difference across every dimension
    </p>

    <Media src="https://www.tutorialexample.com/wp-content/uploads/2020/05/Euclidean-distance-in-tensorflow.png" type="img"/>


    <p>
        Another common distances includes the absolute value distance. In typescript the absolute value can be meassured as follows:
    </p>

    <code>
        // Compute the absolute distance for two vectors
        const similarity = (a:number[], b: number[]) =&gt; &#123;
            // Only compute distance for same length vectors.
            if(center.length !== embedding.length) return Infinity

            const difference = a.reduce((d, i, idx) =&gt; d + Math.abs(i - b[idx]), 0)
            return difference
        &#125;

        similarity([3,4], [4,5]) =&gt; 2  
        // Math.abs(3-4) + Math.abs(4-5) = 1 + 1 = 2


        similarity([3,4], [4,6]) =&gt; 3
        similarity([3,4], [5,6]) =&gt; 4
        similarity([3,4], [1,6]) =&gt; 4 
        // Math.abs(3-1) + Math.abs(4-6) = 2 + 2 = 4


        similarity([3,4,5], [4,5,6]) =&gt; 3
        similarity([3,4,5], [4,6,8]) =&gt; 7
        // Math.abs(3-4) + Math.abs(4-6) + Math.abs(5-8) = 1 + 2 + 3 = 6        
    </code>

    <p>
        With that knowledge the process of finding a synonym is trivial. 
        One only has to find the words that have the minimum distance to the word for which we are finding synonyms. 
        Use the input box below to search for synonyms based on TensorflowJS word embeddings:
    </p>

    <InputForm label={'Find the Synonym.'}/>

    <p>
        Interestingly, it is also possible to find Antonyms with word embeddings, 
        the only difference is to find the words maximize that maximize the  distance to the intended word.
    </p>

    <Chart title="Antonyms of Good"/> 
</Lesson>



