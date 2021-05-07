import { iPosition } from '../components/layout/Menu'
import { SentimentAnalysis } from './SentimentAnalysis'

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



export const Home = ({ position: { unit, module } }: { position:iPosition }) => {
    if(unit === 1) return <SentimentAnalysis />

    if(module === 0) return <Introduction />
    if(module === 1) return <WordEmbeddings />
    if(module === 2) return <Synonyms />
    if(module === 3) return <TopicClassification />
    if(module === 4) return <Training />
    if(module === 5) return <Tokenization />
    if(module === 6) return <CoOcurrenceMatrix />
    if(module === 7) return <DimensionalityReduction />
    if(module === 8) return <Analogies />
    if(module === 9) return <Biasis />
    if(module === 10) return <WordEmbeddingsQuiz />
    if(module === 11) return <BestAnswers />
    if(module === 12) return <WallOfFame />
    if(module === 13) return <AdvancedTopics />
    if(module === 14) return <WordEmbeddingsMedia />
    if(module === 15) return <Products />
    if(module === 16) return <NextSteps />
    if(module === 17) return <References />

    return <BorgesLanding />
}
