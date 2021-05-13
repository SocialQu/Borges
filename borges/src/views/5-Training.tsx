import { Lesson } from "../components/cells/Lesson"

const title = 'How to Train Word Embeddings?'
interface iTraining {next():void}
export const Training = ({next}:iTraining) => <Lesson title={title} next={next}>
    <p>
        As previously mentioned, the idea behind word embeddings is that the meaning of a word is related to its context. 
        In consequence, deriving word embeddings is the result of mapping the words that usually near each other. 
        The process consists of 3 steps:
    </p>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <i> A simple process to build word embeddings can be divided in three steps: </i>
    <ol style={{marginLeft:24, marginTop:'0.5rem'}}>
        <li> <strong>Tokenization:</strong> split, classify and find unique words on a corpus. </li>
        <li> <strong>Co-ocurrence matrix:</strong> map the words that are close to each other. </li>
        <li> <strong>Dimensionality Reduction:</strong> minimize the size of the co-ocurrence matrix. </li>
    </ol>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <p>
        In the next lessons, we will go in more depth through each step and you will train your own word embeddings along the way!
    </p>
</Lesson>
