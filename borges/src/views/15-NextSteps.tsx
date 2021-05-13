import { Lesson } from "../components/cells/Lesson"

const title = 'Next Steps'
interface iNextSteps {next():void}
export const NextSteps = ({next}:iNextSteps) => <Lesson title={title} next={next}>
    <p>
            Congratulations! You reached the end of this module, 
            if you want to deeper you can visit Stanford's CS224U &#38; CS224U Course and Video Lectures.
    </p>

    <p>
        Next month (mid-June), I plan to release a second module about Sentiment Analysis. 
        It will be based on lectures 5-8 from Stanford's CS224U course. 

        You can visit the <a href={"https://gum.co/nlp-sentiment-analysis"}>product page,</a> 
        to express interest, subscribe to the waiting, or contribute to development costs.

        It will be served with a pay-as-you-want model.
    </p>

    <p>
        For more content of my content, you can visit my <a href={"https://santiagoq.medium.com/"}>blog</a>.
    </p>
</Lesson>
