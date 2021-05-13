import { Lesson } from "../components/cells/Lesson"

const title = 'Introduction'
interface iIntroduction {next():void}
export const Introduction = ({next}:iIntroduction) => <Lesson title={title} next={next}>
    <p> 
        Word embeddings are used in almost every commercial application that involves AI and human language. Some  
        <a href="https://github.com/SocialQu/Borges/blob/v.0.0.5-UX/whitepaper/1.%20Applications.md">  example applications </a> 
        include search engines, social media recommendation algorithms, language translation, speech recognition, 
        market research, automated trading, and language generation.
    </p>

    <p>
        This material is based on Stanford's <a href="http://web.stanford.edu/class/cs224n/index.html#schedule">CS224 course</a>, 
        it's directed to Software Engineers, that lack the time or mathematical background, 
        to gain an intuitive understanding of the technology as currently presented in Stanford's 
        <a href={'https://www.youtube.com/watch?v=8rXD5-xhemo&list=PLoROMvodv4rOhcuXMZkNm7j3fVwBBY42z'}> Video Lectures</a>.
    </p>

    <p>
        My goal is to present the information as simple and intuitively as possible: 
        I will not avoid mathematics or code, but rather simplify them to help develop a practical understanding of the content.
        Additionally, I've enabled an interface to play, test and experiment with the concepts, 
        and train your own word embeddings using an elementary approach.
    </p>

    <p>
        <strong>Warning: </strong> 
        Based on Stanford's <a href="https://ed.stanford.edu/academics/masters-handbook/honor-code">honor code</a>, 
        if you are in the process of delivering the first assignment. 
        I advise you not to continue forward with this course. 
        Having said that, I would love to hear your feedback when you are ready.
        You can connect with me on <a href="https://www.linkedin.com/in/santiagoqu/">LinkedIn</a>.
    </p>
</Lesson>
