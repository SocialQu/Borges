import { Lesson } from "../components/cells/Lesson"


const storyLink = 'https://santiagoq.medium.com/the-viral-startup-2ae1968a480b?sk=2f1282dc73652588acf960629a81df89'

const title = 'Next Steps'
interface iNextSteps {next():void}
export const NextSteps = ({next}:iNextSteps) => <Lesson title={title} next={next}>
    <p>
        Congratulations! You reached the end of this module, 
        if you want to deeper you can visit Stanford's <a href="http://web.stanford.edu/class/cs224n/"  target='_blank' rel='noreferrer'>CS224N</a> &#38; <a href="http://web.stanford.edu/class/cs224u/"  target='_blank' rel='noreferrer'>CS224U</a> Course and <a href="https://www.youtube.com/user/stanfordonline"  target='_blank' rel='noreferrer'><strong>Video Lectures</strong></a>. 
    </p>

    <p>
        Next month (mid-June), I will <strong>release a second module about Sentiment Analysis.</strong> 
        It will be based on lectures 5-6 from Stanford's CS224U course. 

        You can visit the <a href={"https://gum.co/nlp-sentiment-analysis"} target='_blank' rel='noreferrer'>product page, </a> 
        to express interest, subscribe to the waiting, or contribute to development costs.

        It will be served with a pay-as-you-want model.
    </p>

    <p>
        Thank you for your interest. For more of my content you can read about a nature-inspired customer acquisition strategy: <a href={storyLink} target='_blank' rel='noreferrer'><strong>"The Viral Startup."</strong></a>
    </p>
</Lesson>
