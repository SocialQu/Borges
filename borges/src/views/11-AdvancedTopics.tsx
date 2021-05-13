import { Lesson } from "../components/cells/Lesson"
import { Subtitle } from "../components/atoms"


const word2VecImage = 'https://www.researchgate.net/profile/Dima-Suleiman/publication/332543231/figure/fig1/AS:749763205009408@1555768886449/CBOW-and-Skip-gram-models-architecture-6.png'
const title = 'Advanced Topics'
interface iAdvancedTopics {next():void}
export const AdvancedTopics = ({next}:iAdvancedTopics) => <Lesson title={title} next={next}>
    <p>
        The process of training our word embeddings was based on Latent Semantic Analysis developed during the 1980's.
        With the advent of Neural Networks and their success in the field of Computer Vision,
        a new realm of possibilites opened to find underlying relationships in words based on their meaning.

        Two important papers that discovered new Neural Network architectures include Google's Word2Vec and Stanford's GloVe. 
    </p>

    <p>
        The idea behind Word2Vec is that word embeddings have a higher fidelity to represent a word's meaning 
        based on their ability to predict the word depending on the context. Word2Vec introduced two analogous methods 
        to train word embeddings based on this understanding.

        The first one CBOW, predicts the word based on the context that surrounds it, and N-Gram predicts the adyacent words
        for each word. The <a href="https://arxiv.org/pdf/1301.3781.pdf">word2vec</a> 
        paper was important also by introducing a way to evaluate the efficacy of word embeddings.
    </p>

    <Subtitle text={"Word2Vec Model Architectures"} style={{textAlign:'center', marginTop:'2rem'}}/>
    <img src={word2VecImage} style={{marginBottom:'2rem'}} alt="Word2Vec Nerural Network Architectures"/>

    <p>
        The second paper, GloVE was based on the assumption that real meaning arises from the relative frequency of words.
        By cleaverly transforming the original sparse co-occurrence matrix, 
        into a denser one where the relative frequency of two words is emphasized.

        GloVe achieved a state-of the art results by combining the best of 2 worlds: the effectiveness finding relationships 
        between words of Latent Semantic Analysis, and the syntactic precision of prediction based models like word2vec.
    </p>
</Lesson>

