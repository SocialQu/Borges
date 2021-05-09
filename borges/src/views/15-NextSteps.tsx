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
        You can visit the <a>pre-sale product</a> site and enjoy an early bird discount. 
        Plus support me in my mission of sharing and educating future NLP engineers.
    </p>

    <p>
        If you want to collaborate you can connect with me on <a>LinkedIn</a>.
    </p>
</Lesson>