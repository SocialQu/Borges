import { Card } from "../components/molecules/Card"
import { Lesson } from "../components/cells/Lesson"
import { Subtitle } from "../components/atoms"

const title = 'Addditional Resources'
interface iWordEmbeddingsMedia {next():void}
export const storyMediaQuery = '(max-width: 768px)'

const storyLink = 'https://medium.com/geekculture/how-to-develop-a-text-recommendation-engine-99d3b46effdb?sk=508c65e2139bfdfbd8043b2090ee1bd7'
const storyBody = 'Recent advances in Deep Learning have made it possible to extend the power of Artificial Intelligence into web browsers. Introduced in 2018, TensorflowJS enables web developers to integrate state-of-the-art models in their applications. One of these models, the universal-sentence-encoder, uses advances in Natural Language Processing to transform words and sentences into mathematical vectors known as word embeddings.'

export const WordEmbeddingsMedia = ({next}:iWordEmbeddingsMedia) => <Lesson title={title} next={next}>
    <Card 
        title={'How to Develop a Text Recommendation Engine'} 
        link={'https://miro.medium.com/max/700/1*KtHoihT_07qtAddbu6NNSQ.png'} 
        body={storyBody} 
        img={storyLink}
    />

    <Subtitle text="How to Develop a Text Recommendation Engine" />
    <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/kg-bEe7mGnc" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
    />
</Lesson>
