import { iQuestion, Quiz } from "../components/cells/Quiz"
import { Subtitle } from "../components/atoms"
import { useState } from "react"


const questions:iQuestion[] = [{ 
    question:'What are word embeddings?', 
    answers:[
        { answer:'A vector space to measure human language.',value:false },
        { answer:'Numerical representations of meaning.',value:true },
        { answer:'The predictions of a words frequency.',value:false },
        { answer:'A Natural Language Processing Neural Network',value:false }
    ] 
}, {
    question:'How synonyms are found?', 
    answers:[
        { answer:'Find the word that minimizes the dot product computation.',value:false },
        { answer:'Find the word that maximizes the dot product computation.',value:false },
        { answer:"Find the closest words, relative to a defined metric.",value:true },
        { answer:'Find the furthest words, relative to a defined metric.',value:false }
    ] 
}, { 
    question:'How to classify a text by topic?', 
    answers:[
        { answer:'Use a convolutional neural network to reduce the dimensions.',value:false },
        { answer:'Use unsupervised learning and k-means clustering.',value:false },
        { answer:`Minimize the distance to the topic's center.`,value:true },
        { answer:'Train a logistic regression for each topic.',value:false },
    ]
}, { 
    question:'How is the co-occurrence Matrix built?', 
    answers:[
        { answer:'Count the adyacent words based on an N-sized window.',value:true },
        { answer:'Use a RegEx to find every unique word.',value:false },
        { answer:`Train a neural network to predict the appearance of a word.`,value:false },
        { answer:'Find all the synonyms for each word.',value:false },
    ]
}, {
    question:'What is an incorrect distance metric?', 
    answers:[
        { answer:'The Identity Distance.',value:true },
        { answer:'The Absolute Value Distance.',value:false },
        { answer:`Euclidean Distance.`,value:false },
        { answer:'Cosine Similarity.',value:false },
    ]
}, { 
    question:`What is the main innovation behind GloVe's word embeddings?`, 
    answers:[
        { answer:'GloVe dismisses stop words during tokenization.',value:false },
        { answer:'GloVe uses two different co-occurrence matrixes.',value:false },
        { answer:'GloVe defines a dynamic N-word window based on punctuation.',value:false },
        { answer:'GloVe applies a transformation to the co-occurrence matrix.',value:true},
    ]
}]


interface iWordEmbeddingsQuiz {next():void, reset():void}
export const WordEmbeddingsQuiz = ({next, reset}:iWordEmbeddingsQuiz) => {
    const [approved, setApproved] = useState(false)
    const [quizFailures, setQuizFailures] = useState(0)

    const approve = (score:number) => {
        if(score > 3) setApproved(true)
        else {
            if(quizFailures > 2) reset()
            setQuizFailures(quizFailures + 1)
        }
    }

    return <Quiz 
        title={'Quiz'}
        description={'Prove your understadning about word embeddings with this short quiz:'}
        questions={questions}
        quizFailures={quizFailures}
        next={() => approved ? next() : null}
        approve={approve}
    >

        <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>
        <Subtitle text="Open Questions" style={{textAlign:'center', marginTop:'2rem'}}/>

        <ol style={{marginLeft:24, marginTop:'0.5rem', textAlign:'left'}}>
            <li> Propose a potential application for word embeddings:</li>
            <li> What concept did you found most interesting? Why?</li>
            <li> Can you imagine a positive modification to build the co-ocurrence?</li>
        </ol>

        <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>
    </Quiz>
}
