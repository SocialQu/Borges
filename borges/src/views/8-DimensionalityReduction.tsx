import { a11yLight as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'

import { Lesson } from "../components/cells/Lesson"
import { Subtitle, Scatter } from "../components/atoms"
import { iEmbeddings } from "./Home"


const codeString = `import { PCA } from 'ml-pca'

const reduceDimensionality = (dimensions:number) => {
    const pca = new PCA(embeddings)
    const newSize = {nComponents:dimensions}  
    const reducedVectors = pca.predict(embeddings, newSize)
    return reducedVectors
}`

const title = 'Dimensionality Reduction'
interface iDimensionalityReduction {embeddings:iEmbeddings[], next():void}
export const DimensionalityReduction = ({embeddings, next}:iDimensionalityReduction) => <Lesson title={title} next={next}>
    <p>
        Theoretically, we have finished. We could use the rows of the co-occurrence matrix as word embeddings. 
        But look again at the matrix, and notice how sparse it is. There are several issues associated with this:        
    </p>


    <ul style={{marginBottom:'2rem'}}>
        <li>The vectors would take too much storage space.</li>
        <li>Training models on top of these vectors would be slow.</li>
        <li>Relations between words would be difficult to notice.</li>
    </ul>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <p>
        In that sense, the final step to build the word embeddings is to reduce the dimension of the co-occurrence matrix. 
        A small text corpus can have tens of thousands of unique words. 
        Word embeddings used in enterprise applications tend to be smaller than 1,000 dimensions. 
        For example, the universal sentence encoder vectors in TensorflowJS have a size of 512.
    </p>

    <p>
        There are sophisticated methods in deep learning to compress a matrix. 
        But to remain simple, we are going to use the Principal Component Analysis (PCA) method:    
    </p>

    <Subtitle text={"Reducing the Matrix's Dimension"} style={{textAlign:'center', marginTop:'2rem'}}/>
    <SyntaxHighlighter language="typescript" style={codeStyle}>
        {codeString}
    </SyntaxHighlighter>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <p>
        If we reduce the word embedding's dimensions to only 2, 
        we can plot them and gain a visual understanding of the relationship between different words. 
        This is are the 2D word embeddings for the text you submitted:
    </p>

    <Scatter label="Your Word Embeddings Chart" data={[embeddings]} />
</Lesson>
