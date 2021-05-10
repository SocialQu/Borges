import { Landing } from '../components/cells/Landing'
import YouTubePlayer from 'react-player/youtube'


const title = 'Introduction to Word Embeddings'
const subtitle = 'Learn about the AI technology that powers Human Language Understanding.'

export const BorgesLanding = () => <Landing title={title} subtitle={subtitle} cta={() => {}}>
    <YouTubePlayer url={'https://www.youtube.com/watch?v=ZytU3s1T2XY'} style={{margin:'auto'}}/>
</Landing>
