import { Subtitle } from "../components/atoms"
import { Lesson } from "../components/cells/Lesson"

const title = 'What are word embeddings?'
interface iWordEmbeddings {next():void}
export const WordEmbeddings = ({next}:iWordEmbeddings) => <Lesson title={title} next={next}>
    <p>
        Word embeddings are numerical representations of a word's meaning. 
        They are formed based on the assumption that meaning is contextual. 
        That is, a word's meaning is dependant on its neighbors:
    </p>

    <img 
        style={{maxWidth:'calc(100% - 25px)', marginLeft:25}}
        src={"https://cdn-images-1.medium.com/max/800/0*1JilkAo3wHgL7Y-S.png"} 
    />

    <p>
        <i>For example, if the word "ice" usually appears next to "water", one could infer that both words have a similar meaning.</i>
    </p>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <p>
        Word embeddings are represented as mathematical vectors. 
        This representation enables to perform standard mathematical operations in words, like addition and subtraction. 
    </p>
        
    <img
        style={{maxWidth:'90%', margin:'1rem 3% 1.5rem'}} 
        src={"https://cdn-images-1.medium.com/max/800/0*QcFWhMO-HSNHiLG_.png"}
    />

    <p>        
        These operations have interesting applications in language, like finding synonyms, classifying documents, or recommending content. 
        Additionally, 2-dimensional vectors can be plotted to produce a visual understanding of a document or a person's language.
    </p>
</Lesson>
