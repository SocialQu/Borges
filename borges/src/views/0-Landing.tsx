import { Landing } from '../components/cells/Landing'
import YouTubePlayer from 'react-player/youtube'


const title = 'Introduction to Word Embeddings'
const subtitle = 'Gain an intuitive understanding of the AI technology that powers human language understanding.'

export const BorgesLanding = () => <Landing title={title} subtitle={subtitle} cta={() => {}}>
    <YouTubePlayer url={'https://www.youtube.com/watch?v=ZytU3s1T2XY'} />
</Landing>
