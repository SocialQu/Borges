import { Lesson } from "../components/cells/Lesson"

const title = 'Next Steps'
interface iNextSteps {next():void}
export const NextSteps = ({next}:iNextSteps) => <Lesson title={title} next={next}>
    <p>
        Congratulations! You reached the end, if you want to deeper you can visit the Stanford Courses. 
        A number of free are also available to download for free:
    </p>

    <p>
        Next month, I will release the a paid module about Sentiment Analysis, 
        it will be based on lectures 5-8 of Stanford's CS224U. 
        You can visit the <a href={"https://gum.co/nlp-sentiment-analysis"}>pre-sale product</a> 
        site and enjoy an early bird discount. 
        Plus support me in my mission of sharing and educating future NLP engineers.
    </p>

    <p>
        For more content of my content, you can visit my <a href={"https://santiagoq.medium.com/"}>Medium</a> blog.
    </p>
</Lesson>
