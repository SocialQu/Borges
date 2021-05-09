import { iQuestion, Quiz } from "../components/cells/Quiz"
import { TextAreaForm } from "../components/molecules/Form"
import { Lesson } from "../components/cells/Lesson"

const questions:iQuestion[] = [
    { 
        question:'How antonyms are computed?', 
        answers:[
            {answer:'Find the word that minimizes the dot product computation.',value:false},
            {answer:'Find the word that maximizes the dot product computation.',value:false},
            {answer:'Define a distance and find the word that is closer.',value:false},
            {answer:'Define a distance and find the word that is furthest.',value:true}
        ] 
    }, { 
        question:'How to classify a text by topic?', 
        answers:[
            {answer:'Use a convolutional neural network to reduce the dimnesionality of the vector space.',value:false},
            {answer:'Use unsupervised learning and k-means clustering.',value:false},
            {answer:"Minimize the distance to the topic's center.",value:true},
            {answer:'Train a logistic regression for each topic.',value:false},
        ] 
    }, { 
        question:'How is the co-ocurrence Matrix built?', 
        answers:[
            {answer:'Count the ajacent words based on an N-sized window.',value:true},
            {answer:'Use a RegEx to find every unique words.',value:false},
            {answer:'Train a neural network to predict the appearance of a word.',value:false},
            {answer:'Find all the synonyms for each word.',value:false},
        ] 
    }, { 
        question:'What is an incorrect distance metric?', 
        answers:[
            {answer:'The Identity Distance.',value:false},
            {answer:'The Absolute Value Distance.',value:false},
            {answer:'Euclidean Distance.',value:false},
            {answer:'Cosine Similarity.',value:true},
        ] 
    }, { 
        question:`What is the main innovation behind GloVe's word embeddings?`, 
        answers:[
            {answer:'GloVe dismisses stop words.',value:false},
            {answer:'GloVe uses two different co-ocurrence matrix.',value:false},
            {answer:'GloVe defines the N-sized window based on punctuation signs.',value:false},
            {answer:'GloVe applies a linear transformation to the co-ocurrence matrix.',value:true},
        ]
    }
]


const title = "Word Embeddings Quiz"
interface iWordEmbeddingsQuiz {next():void}
export const WordEmbeddingsQuiz = ({next}:iWordEmbeddingsQuiz) => <Lesson title={title} next={next}>
    <Quiz 
        questions={questions}
        quizFailures={0}
        next={() => {}}
        approve={() => {}}
    />

    <TextAreaForm label={"1. Propose a potential application for word embeddings?"}/>
    <TextAreaForm label={"2. What concept did you found most interesting? Why?"} />
    <TextAreaForm label={"3. Can you imagine a positive alteration as to how the co-ocurrence is build?"} />
</Lesson>
