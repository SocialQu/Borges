import { Lesson } from "../components/cells/Lesson"
import { Subtitle } from "../components/atoms"


const word2VecImage = 'https://www.researchgate.net/profile/Dima-Suleiman/publication/332543231/figure/fig1/AS:749763205009408@1555768886449/CBOW-and-Skip-gram-models-architecture-6.png'
const gloveImg = 'https://cdn-images-1.medium.com/max/800/1*-XQCspjyX1A42wiWxi96LQ.png'

const title = 'Advanced Topics'
interface iAdvancedTopics {next():void}
export const AdvancedTopics = ({next}:iAdvancedTopics) => <Lesson title={title} next={next}>
    <p>
        The process we used to build your word embeddings is based on research during the 1980s, called Latent Semantic Analysis (LSA). 
        But during the last decade, it has evolved to incorporate Neural Networks. 
        After their successful implementation in Computer Vision, 
        <strong> Neural Networks were adopted</strong> by the Natural Language Processing academic community.
    </p>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <p> Four research papers have shaped how word embeddings are currently built: </p>


    <ol style={{marginLeft:24, marginTop:'0.5rem'}}>
        <li> <strong>Word2Vec: </strong>  Efficient Estimation of Word Representations in Vector Space </li>
        <li> <strong>GloVe: </strong> Global Vectors for Word Representation.</li>
        <li> <strong>ELMO: </strong> Deep contextualized word representations.</li>
        <li> <strong>BERT: </strong> Pre-training of Deep Bidirectional Transformers for Language Understanding.</li> 
    </ol>    

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <Subtitle text="Word2Vec: Word Embeddings trained from predictions" style={{textAlign:'center', marginTop:'2rem'}}/>

    <p>
        Word2Vec, a paper by Google scientists, 
        is based on the premise that word embeddings are <strong> more accurate if trained to predict </strong> a word's occurrence. 
        The paper introduced two complementary neural network architectures to make predictions and subsequently derive word embeddings.
    </p>

    <p>
        Using the same N-word window concept, 
        Word2Vec proposed the <strong>Continuous Bag of Words (CBOW)</strong> architecture to predict a word based on its neighbors. 
        Analogously, the <strong>Skip-gram architecture</strong> attempted to predict the neighbors based on a specific word.
    </p>

    <Subtitle text={"Word2Vec Model Architectures"} style={{textAlign:'center', marginTop:'2rem', fontSize:'1.25rem'}}/>
    <img src={word2VecImage} style={{marginBottom:'2rem'}} alt="Word2Vec Nerural Network Architectures"/>


    <p>
        The paper was also innovative because of the size of the dataset used to train the neural network. 
        It also introduced a second dataset that became the standard to benchmark the accuracy of new models. 
        It was mostly composed of analogies and included two sections: <strong>a syntactic and a semantic.</strong>
    </p>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>
    <Subtitle text="GloVe: Finding hidden relationships between words" style={{textAlign:'center', marginTop:'2rem'}}/>

    <p>
        Only a year later (2014), developed by Stanford researchers. 
        GloVe merged the best of both worlds: 
        the <strong>subtle semantic relationships</strong> discovered by Latent Semantic Analysis 
        and the syntactic accuracy of Word2Vec predictions.
    </p>


    <p>
        GloVe was based on the powerful intuition that 
        the true meaning of a word is derived from the 
        <strong> difference to the expected probability</strong> of two words ocurring next to each other.<br/><br/> 
        GloVe reduced the noise produced by frequently occurring words. 
        
        This means that if 2 words are relatively uncommon but frequently appear next to each other, 
        <strong> the impact of that relationship is more relevant</strong> to build the respective word embeddings.
    </p>

    <Subtitle text={"GloVe's state of the art results"} style={{textAlign:'center', marginTop:'2rem', fontSize:'1.25rem'}}/>
    <div style={{textAlign:'center'}}>
        <img src={gloveImg} style={{marginBottom:'2rem'}} alt="Word2Vec Nerural Network Architectures"/>
    </div>


    <p>
        GloVe schemed a clever method to identify, transform, and map those "high-value" relationships. 
        As a consequence, the previously sparse <strong>co-occurrence matrix became densely populated. </strong> 
        In a beautiful mathematical derivation, the cells of the new matrix were the result of the dot product 
        between a row and a column of the original matrix.
    </p>


    <p>
        By keeping the co-occurrence matrix small, it was possible to keep the training time short. 
        More importantly, GloVe proved to be the only model at the time that <strong>benefited from an increase 
        in the training dataset size</strong> (from 6 billion to 42 billion tokens).
    </p>
</Lesson>

