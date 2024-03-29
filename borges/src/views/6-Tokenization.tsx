import { a11yLight as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'

import { TextAreaForm } from '../components/molecules/Form'
import { Lesson } from "../components/cells/Lesson"
import { Subtitle } from '../components/atoms'
import { iEmbeddings } from './Home'


const codeString = `/* tokenize: split the words in a text or document. */
const tokenize (text:string) => text.match(/(\b[^ $]+\b)/g)`

const title = 'Tokenization'
interface iTokenization {embeddings:iEmbeddings[], getWords(text:string):void, next():void}
export const Tokenization = ({embeddings, getWords, next}:iTokenization) => <Lesson title={title} next={next}>
    <p>
        There is a long tradition in Natural Language Processing (NLP) to <strong>separate words</strong> that includes stemming and lemmatization.<br/><br/> Some of the <strong>difficulties</strong> when splitting a text include:
    </p>

    <ul style={{marginBottom:'2rem'}}>
        <li> Words that have the <strong>same meaning</strong>, including plurals and conjugated verbs. </li>
        <li> Pronouns, prepositions, and articles that appear frequently but contribute little additional meaning. </li>
        <li> <strong>Abbreviations</strong> and compound words like N.Y.C. or New York. </li>
        <li> Words with internal hyphens or apostrophes. </li>
        <li> Numbers, symbols, and <strong>punctuation signs</strong> like parenthesis or ellipsis. </li>
        <li> Orthographic errors. </li>
    </ul>

    <Subtitle text={"Example: RegEx Tokenizer"} style={{textAlign:'center', marginTop:'2rem'}}/>
    <SyntaxHighlighter language="typescript" style={codeStyle}>
        {codeString}
    </SyntaxHighlighter>

    <p>
        With the advent of Deep Learning, tokenization has partially lost relevance. Because 
        <strong> the best AI models should handle irregularities</strong> by themselves, and building tokenizers is a slow, 
        manual process. However, using tokenizers or other input transformations can dramatically reduce training speed and improve accuracy.    
    </p>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <p>
        To start training your own word embeddings, please <strong>insert a short text</strong> (~20 words) to tokenize it:
    </p>


    <TextAreaForm submit={getWords} label={"Excersice: Tokenize a Text"}/>
    <p style={{textAlign:'center'}}> <strong> Word Embeddings:</strong> {embeddings.length} </p>
    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <p>
        <strong> Important: </strong> the text you submitted will be used in the next 2 lessons.
    </p>
</Lesson>
