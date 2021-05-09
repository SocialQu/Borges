import { Lesson } from "../components/cells/Lesson"
import { Chart } from '../components/atoms'

const title = 'Dimensionality Reduction'
export const DimensionalityReduction = () => <Lesson title={title} next={() => {}}>
    <p>
        Did you noticed how sparse (full of zeros) the co-ocurrence matrix is? 
        This leads us to the next and final step: dimensionality reduction.
    </p>

    <p>
        The idea is that by having a dense matrix it will be faster to run computations, 
        less storage will be required and relationships between words will be featured in a single column.
    </p>

    <p>
        There are sophisitcated deep learning methods to reduce a matrix dimension, 
        but in our case we will be using a simple Machine Learning Linear Algebra methodology called PCA. 
        TensorflowJS native word embeddings are 512-dimensional size, which is about average.
    </p>

    <p>
        Your dataset has been reduced to only 2D, to be able to plot it. 
        Below is a chart with random words embeddings based on your dataset. 
        You can select different words to see how they compare with each other:
    </p>

    <Chart title="Your Word Embeddings Chart" />
</Lesson>
