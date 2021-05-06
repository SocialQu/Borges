import { BorgesLanding } from './0-Landing'
import { Introduction } from './1-Introduction'
import { WordEmbeddings } from './2-WordEmbeddings'
import { Synonyms } from './3-Synonyms'
import { TopicClassification } from './4-TopicClassification'
import { Training } from './5-Training'
import { Tokenization } from './6-Tokenization'
import { CoOcurrenceMatrix } from './7-CocurrenceMatrix'
import { DimensionalityReduction } from './8-DimensionalityReduction'
import { Analogies } from './9-Analogies'
import { Biasis } from './10-Biasis'
import { WordEmbeddingsQuiz } from './11-Quiz'
import { BestAnswers } from './12-BestAnswers'
import { WallOfFame } from './13-WallOfFame'
import { AdvancedTopics } from './14-AdvancedTopics'
import { WordEmbeddingsMedia } from './15-Media'
import { Products } from './16-Products'
import { NextSteps } from './17-NextSteps'
import { References } from './18-References'


export const Home = ({ lesson }: { lesson:number }) => {
    if(lesson === 1) return <Introduction />
    if(lesson === 2) return <WordEmbeddings />
    if(lesson === 3) return <Synonyms />
    if(lesson === 4) return <TopicClassification />
    if(lesson === 5) return <Training />
    if(lesson === 6) return <Tokenization />
    if(lesson === 7) return <CoOcurrenceMatrix />
    if(lesson === 8) return <DimensionalityReduction />
    if(lesson === 9) return <Analogies />
    if(lesson === 10) return <Biasis />
    if(lesson === 11) return <WordEmbeddingsQuiz />
    if(lesson === 12) return <BestAnswers />
    if(lesson === 13) return <WallOfFame />
    if(lesson === 14) return <AdvancedTopics />
    if(lesson === 15) return <WordEmbeddingsMedia />
    if(lesson === 16) return <Products />
    if(lesson === 17) return <NextSteps />
    if(lesson === 18) return <References />

    return <BorgesLanding />
}
