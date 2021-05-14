import { Lesson } from "../components/cells/Lesson"


const applicationsLink = 'https://github.com/SocialQu/Borges/blob/main/whitepaper/1.%20Applications.md'
const courseLink = 'http://web.stanford.edu/class/cs224n/index.html#schedule'
const videosLink = 'https://www.youtube.com/watch?v=8rXD5-xhemo&list=PLoROMvodv4rOhcuXMZkNm7j3fVwBBY42z'
const honorCodeLink = 'https://ed.stanford.edu/academics/masters-handbook/honor-code'
const linkedInLink = 'https://www.linkedin.com/in/santiagoqu'

const title = 'Introduction'
interface iIntroduction {next():void}
export const Introduction = ({next}:iIntroduction) => <Lesson title={title} next={next}>
    <p> 
        Word embeddings are used in almost every commercial application that involves AI and human language. Some  
        <a href={applicationsLink} target='_blank' rel='noreferrer'>  example applications </a> 
        include search engines, social media recommendation algorithms, language translation, speech recognition, 
        market research, automated trading, and language generation.
    </p>

    <p>
        This material is based on Stanford's <a href={courseLink} target='_blank' rel='noreferrer'>CS224 course</a>, 
        it's directed to Software Engineers, that lack the time or mathematical background, 
        to gain an intuitive understanding of the technology as currently presented in Stanford's 
        <a href={videosLink} target='_blank' rel='noreferrer'> Video Lectures</a>.
    </p>

    <p>
        My goal is to present the information as simple and intuitively as possible: 
        I will not avoid mathematics or code, but rather simplify them to help develop a practical understanding of the content.
        Additionally, I've enabled an interface to play, test and experiment with the concepts, 
        and train your own word embeddings using an elementary approach.
    </p>

    <p>
        <strong>Warning: </strong> 
        Based on Stanford's <a href={honorCodeLink} target='_blank' rel='noreferrer'>honor code</a>, 
        if you are in the process of delivering the first assignment. 
        I advise you not to continue forward with this course. 
        Having said that, I would love to hear your feedback when you are ready.
        You can connect with me on <a href={linkedInLink} target='_blank' rel='noreferrer'>LinkedIn</a>.
    </p>
</Lesson>
