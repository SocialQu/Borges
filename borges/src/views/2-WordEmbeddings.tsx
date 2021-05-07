import { Lesson } from "../components/cells/Lesson"

const title = 'What are word embeddings?'
interface iWordEmbeddings {next():void}
export const WordEmbeddings = ({next}:iWordEmbeddings) => <Lesson title={title} next={next}>
    <p>
        Word embeddings are numberical represation of the meaning in human language. 
        They are based on the assumption that the meaning of a word is contextual: 
        the meaning of a word is dependant of their adyacent words and their appearence on a given document.
    </p>

    <p>
        This means that if ice frequently appears in a context that talks and mentions water, 
        the meaning of ice would be similar to the meaning of water.
    </p>

    <p>
        This meaning of a word is represented in a mathematical vector, 
        this enables to perform standard mathematical opperations in words like addition and substraction 
        that produce interesting results like finding synonyms, classying documents, and recommending or moderating content.
    </p>

    <p>
        Additionally, 2D vectors have the possibility to be plotted to produce a visual understanding of a lexicon, 
        document or a persons's language.
    </p>
</Lesson>
