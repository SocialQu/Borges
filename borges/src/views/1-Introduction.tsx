import { Lesson } from "../components/cells/Lesson"

const title = 'Introduction'
export const Introduction = () => <Lesson title={title} next={() => {}}>
    <p> 
        Word embeddings are used in almost every commercial application that involves AI and human language. 
        Some <a href="">example applications</a> include search engines, social media recommendation algorithms, language translation, 
        speech recognition, market reasearch, automated trading and language generation.
    </p>

    <p>
        This course is based on the Stanford's <a>CS224 course</a>, 
        it's directed to Software Engineers, that lack the time or mathematical background, 
        to gain an intuitive understanding of this technology as presented in the Stanford <a>Video Lectures</a>.
    </p>

    <p>
        My goal for the course is to present the information as simple and intuitive as possible. 
        I do not avoid mathematics, but try to simplify them as much as possible.
        To the point that using elemental mathematics helps to develop an understaning of this concepts. 
        Additionaly, I've enabled an interface to play, test and experiment with the concepts and train your own word embeddings.
    </p>

    <p>
        <strong>Warning:</strong> 
        Based on Stanford's <a>honor code</a>, 
        if your are in the process of delivering the first assignment, 
        I advice you not to continue forward with this course. 
        Having said that, I would love to hear your feedback about the course once you are over.
        You can connect with me at <a>LinkedIn</a>.
    </p>
</Lesson>
