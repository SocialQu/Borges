import { Tabs } from '../components/molecules/Tabs'
import { Lesson } from "../components/cells/Lesson"

const title = 'Wall of Fame'
interface iWallOfFame {next():void}
export const WallOfFame = ({next}:iWallOfFame) => <Lesson title={title} next={next}>
    <p>
        Congratulations on the course completion, here you'll find a sample of the best answers, 
        and examples from other students. Please upvote the ones you enjoy the most!
    </p>

    <Tabs 
        tabs={[
            'Synonyms',
            'Analogies',
            'Biases',
            'Word Embeddings',
            'Topic Classification'
        ]}
    />
</Lesson>
