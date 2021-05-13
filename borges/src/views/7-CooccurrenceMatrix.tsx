import { Lesson } from "../components/cells/Lesson"
import { Subtitle } from '../components/atoms'

const coOccurrenceMatrixImg = "https://www.researchgate.net/profile/Majid_F_Sadi/publication/332703770/figure/fig1/AS:752289044234240@1556371093356/1-Co-occurrence-matrix-for-three-sample-sentences.ppm" 
const title = 'Co-occurrence Matrix'
interface iCooccurrenceMatrix {words:string[], matrix:number[][], next():void}
export const CooccurrenceMatrix = ({words, matrix, next}:iCooccurrenceMatrix) => <Lesson title={title} next={next}>
    <p>
        The co-occurrence matrix contains the frequency that two different words occur next to each other. 
        Building the matrix is a four-step process:
    </p>

    <ol style={{marginLeft:24, marginTop:'0.5rem'}}>
        <li> Create a set with every unique word in the training dataset (corpus). </li>
        <li> Create a squared matrix where each row and column represents a word. </li>
        <li> Count the occurrences of neighbor words based on an N-word window. </li>
        <li> Insert the count to the corresponding cell in the matrix. </li>
    </ol>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <Subtitle text="Example: A Co-occurrence Matrix" style={{textAlign:'center', marginTop:'2rem'}}/>
    <img src={coOccurrenceMatrixImg}/>

    <div className="code" style={{marginLeft:0, marginRight:0}}>
        // Sentences used to build the samle co-occurrence matrix. <br/>
        1. I like deep learning. <br/>
        2. I enjoy flying. <br/>
        3. I like NLP. <br/>
    </div>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <p>
        The above example worked with a 1-word-window. 
        To illustrate how this differs based on the window size, consider the following sentence:
    </p>

    <div className={"code"}>
        // For an 3-word-window: <br/>
        const str = 'I enjoy learning Natural Language Processing.' <br/><br/>

        // enjoy &amp; learning are adyacent. <br/>
        // enjoy &amp; Natural are adyacent. <br/>
        // enjoy &amp; Language are adyacent. <br/>
        // enjoy &amp; Processing are *NOT* adyacent. <br/>
    </div>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <p>
        For our word embeddings, we are going to use a 5-word-window. <br/>
        This is your co-occurrence matrix based on the text you submitted in the previous lesson:
    </p>

    <div className="table-container">
        <Subtitle text="Your Co-occurrence Matrix" style={{textAlign:'center', marginTop:'2rem'}}/>
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
