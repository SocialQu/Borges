import { TextAreaForm } from '../components/molecules/Form'
import { Lesson } from "../components/cells/Lesson"
import { Subtitle } from '../components/atoms'

const title = 'Tokenization'
interface iTokenization {getWords(text:string):void, next():void}
export const Tokenization = ({getWords, next}:iTokenization) => <Lesson title={title} next={next}>
    <p>
        The first step to train word embeddings is to separate the text by words. 
        This can be done trivially through regex, but there is also a long tradintion in NLP (Natural Language Processing) 
        that precedes Deep Learning and consists of manually aggregating words that have the same root, this includes plurals and conjugated verbs.
    </p>

    <p>
        Other points to consider are words that ocurr frequently and add little extra context 
        this includes most prepositions and are usually referred as stop words. 
        The other end of the spectrum requires extra attention, as for low frenquency words it may be difficult to get 
        suffiecient context or they maybe product of an ortogrpahic error.
    </p>

    <p>
        Ideally, the best deep learning models should take care of this anomalies by themselves, but its important to note. 
        That optimizations in this step can produce a reduction of training time, and increase of accuracy. 
        For our purposes we are going to use a simple regex, and do not worry about subtlties:
    </p>

    <Subtitle text="Example: Tokenization Regex" style={{textAlign:'center', marginTop:'2rem'}}/>
    <div className={"code"}>
        text.match(/(\b[^ $]+\b)/g)
    </div>

    <p>
        To exemplify some of the difficulties we need to deal when using a RegEx to tokenize a corpus, 
        consider the following <a href="https://web.stanford.edu/~jurafsky/slp3/2.pdf">[1]</a>:
    </p>

    <ul style={{marginBottom:'2rem'}}>
        <li> Abbreviations and compound words like N.Y.C and New York </li>
        <li> Words with internal hyphens </li>
        <li> Numbers with symbols like $, % </li>
        <li> Various punctuation symbols like ellipsis or parthesis </li>
    </ul>

    <p>
        Now, to start training your own word embeddings, 
        please insert a medium to long text (minimum 1000 words) for tokenization.
    </p>


    <TextAreaForm submit={getWords} label={"Excersice: Tokenize a Text"}/>

    <p>
        <strong> Important: </strong> the text you just submitted will be used on the next 2 lessons.
    </p>
</Lesson>
