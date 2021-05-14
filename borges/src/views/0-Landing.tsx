import { Landing } from '../components/cells/Landing'
import YouTubePlayer from 'react-player/youtube'


const title = 'Introduction to Word Embeddings'
const subtitle = 'Learn about the AI technology that powers Human Language Understanding.'

interface iBorgesLanding { cta():void }
export const BorgesLanding = ({ cta }:iBorgesLanding) => <Landing title={title} subtitle={subtitle} cta={cta}>
    <YouTubePlayer url={'https://www.youtube.com/watch?v=ZytU3s1T2XY'} style={{margin:'auto'}}/>
</Landing>
