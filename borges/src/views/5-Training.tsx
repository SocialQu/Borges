import { Lesson } from "../components/cells/Lesson"

const title = 'How to train Word Embeddings?'
interface iTraining {next():void}
export const Training = ({next}:iTraining) => <Lesson title={title} next={next}>
    <p>
        As mentioned, the motivation of word embeddings is that the meaning of a word is dependant on its context. 
        That is the words that surround it, and the text and documents in which they are present. 
        In consequence, finding and training word embeddings is a result of mapping the words that are usually near each other.
    </p>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <i> A simple process to build word embeddings can be divided in three steps: </i>
    <ol style={{textAlign:'left', marginTop:'0.5rem'}}>
        <li> <strong>Tokenization:</strong> split, classify and find unique words on a corpus. </li>
        <li> <strong>Co-ocurrence matrix:</strong> map the words that are close to each other. </li>
        <li> <strong>Dimensionality Reduction:</strong> minimize the size of the co-ocurrence matrix. </li>
    </ol>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <p>
        In the next lessonss, we will go in more depth through each step and you will train your own word embeddings along the way!
    </p>
</Lesson>
