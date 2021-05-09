import { Lesson } from "../components/cells/Lesson"
import { Media } from '../components/atoms'

const coocurrenceMatrix = "https://www.researchgate.net/profile/Majid_F_Sadi/publication/332703770/figure/fig1/AS:752289044234240@1556371093356/1-Co-occurrence-matrix-for-three-sample-sentences.ppm" 
const title = 'Co-ocurrence Matrix'
interface iCoOcurrenceMatrix {words:string[], matrix:number[][], next():void}
export const CoOcurrenceMatrix = ({words, matrix, next}:iCoOcurrenceMatrix) => <Lesson title={title} next={next}>
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

    <div className="table-container">
        <table className="table">
            <thead>
                <tr> 
                    <th/>
                    { words.map(word => <th><abbr title={word}>{word.slice(0,3)}</abbr></th>) } 
                </tr>
            </thead>

            <tfoot>
                <th/>
                <tr> { words.map(word => <th><abbr title={word}>{word.slice(0,3)}</abbr></th>) } </tr>
            </tfoot>

            <tbody>
                { 
                    words.map((word, i) => 
                        <tr>
                            <td> {word} </td>
                            { words.map((w, id) => <td> {matrix[i][id]} </td>)}
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>    

</Lesson>
