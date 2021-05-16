import { Landing } from '../components/cells/Landing'
import YouTubePlayer from 'react-player/youtube'
import { useMediaQuery } from 'react-responsive'


const title = 'Introduction to Word Embeddings'
const subtitle = 'Learn about the AI technology that powers Human Language Understanding.'

interface iBorgesLanding { cta():void }
export const BorgesLanding = ({ cta }:iBorgesLanding) => {
    const midScreen = useMediaQuery({ query: '(min-width: 660px)' })
    const largeScreen =  useMediaQuery({ query: '(min-width: 900px)' })

    return <Landing title={title} subtitle={largeScreen ? subtitle : ''} cta={cta}>
        <YouTubePlayer 
            url={'https://www.youtube.com/watch?v=ZytU3s1T2XY'} 
            width={midScreen ? 640 : 320} 
            height={midScreen ? 360 : 240} 
            style={{margin:'auto'}}
        />
    </Landing>
}
