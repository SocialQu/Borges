import { Lesson } from "../components/cells/Lesson"
import { Chart, Media } from '../components/atoms'

const coocurrenceMatrix = "https://www.researchgate.net/profile/Majid_F_Sadi/publication/332703770/figure/fig1/AS:752289044234240@1556371093356/1-Co-occurrence-matrix-for-three-sample-sentences.ppm" 
const title = 'Co-ocurrence Matrix'
export const WordEmbeddings = () => <Lesson title={title} next={() => {}}>
    <p>
        The second step involves finding adyacent words, and mapping this relationships in a Matrix. 
        The first step is to enlist every unique word in our corpus (text dataset). 
        Once defined, we will build a square matrix where each column and row represents a word.
    </p>

    <Media type={"img"} src={coocurrenceMatrix}/>

    <p>
        Next, define an N-sized window, where every word that is at most N words appart is considered adjacent like this:
    </p>

    <code>
        // For an 3 sized window:

        const str = 'I enjoy learning about Natural Language Proccesing.'

        // enjoy &amp; learning are adyacent.
        // enjoy &amp; about are adyacent.
        // enjoy &amp; Natural are adyacent.
        // enjoy &amp; Language are *NOT* adyacent.
    </code>

    <p>
        For our case we are going to use a 5 word window and based on the text you submitted, 
        this is how your co-occurrence matrix looks:
    </p>

    <Chart title={"Coocurrence training data matrix."}/> 

</Lesson>
