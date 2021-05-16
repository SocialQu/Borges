import { Card } from "../components/molecules/Card"
import { Lesson } from "../components/cells/Lesson"
import { useMediaQuery } from 'react-responsive'
import { Subtitle } from "../components/atoms"

const title = 'Addditional Resources'
interface iWordEmbeddingsMedia {next():void}
export const storyMediaQuery = '(max-width: 768px)'

const storyLink = 'https://medium.com/geekculture/how-to-develop-a-text-recommendation-engine-99d3b46effdb?sk=508c65e2139bfdfbd8043b2090ee1bd7'
const storyImg='https://miro.medium.com/max/1930/1*KtHoihT_07qtAddbu6NNSQ.png'

export const WordEmbeddingsMedia = ({next}:iWordEmbeddingsMedia) => {
    const midScreen = useMediaQuery({ query: '(min-width: 660px)' })
    
    return <Lesson title={title} next={next}>
        <p>
            Go deeper into the topics we covered with these additional resources:
        </p>

        <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>
        <Card
            title={'How to Develop a Text Recommendation Engine'} 
            titleStyle={{textAlign:'center'}}
            link={storyLink}
            img={storyImg}
        >
            <p>
                Learn the architecture to build a text recommendation engine using 
                TensorflowJS sentence encoder, TypeScript, React & MongoDB.
            </p>
        </Card>
        <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

        <Subtitle text="Code Tutorial: Build a Recommendation Engine" style={{textAlign:'center'}}/>
        <div style={{textAlign:'center'}}>
            <iframe
                width={ midScreen ? 560 : 320 } 
                height= { midScreen ? 315 : 240 }
                src="https://www.youtube.com/embed/kg-bEe7mGnc"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>

        <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>
    </Lesson>
}
