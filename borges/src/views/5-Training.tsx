import { Lesson } from "../components/cells/Lesson"

const title = 'How to train Word Embeddings?'
interface iTraining {next():void}
export const Training = ({next}:iTraining) => <Lesson title={title} next={next}>
    <p>
        As mentioned, the motivation of word embeddings is that the meaning of a word is dependant on its context. 
        That is the words that surround it, and the text and documents in which they are present. 
        In consequence, finding and training word embeddings is a result of mapping the words that are usually near each other.
    </p>

    <ul>
        A simple process to The process can be divided in four steps:
        <li> 1. Tokenization: spli, classify and find unique words on a corpus. </li>
        <li> 2. Co-ocurrence matrix: map the words that are close to each other. </li>
        <li> 3. Dimensionality Reduction: minimize the size of the co-ocurrence matrix. </li>
    </ul>

    <p>
        In the next lessonss, we will go in more depth through each step and you will train your own word embeddings along the way!
    </p>
</Lesson>
