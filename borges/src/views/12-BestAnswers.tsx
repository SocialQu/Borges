import { Tabs } from '../components/molecules/Tabs'
import { Lesson } from "../components/cells/Lesson"

const title = 'Best Answers'
interface iBestAnswers {next():void}
export const BestAnswers = ({next}:iBestAnswers) => <Lesson title={title} next={next}>
    <p>
        Congratulations on the course completion, here you'll find a sample of the best answers, 
        and examples from other students. Please upvote the ones you enjoy the most!
    </p>

    <Tabs 
        tabs={[
            'Word Embedding Applications.', 
            'The Most Interesting Concepts.', 
            'Improvements to the word ocurrence Matrix.', 
            'Your Gender Bias Solutions.'
        ]}
    />
</Lesson>
