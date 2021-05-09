import { iPosition } from '../components/layout/Menu'
import { SentimentAnalysis } from './SentimentAnalysis'
import { tokenizeWords } from '../scripts/utils'
import { useState } from 'react'
import { User } from 'realm-web'

import { BorgesLanding } from './0-Landing'
import { Introduction } from './1-Introduction'
import { WordEmbeddings } from './2-WordEmbeddings'
import { Synonyms } from './3-Synonyms'
import { TopicClassification } from './4-TopicClassification'
import { Training } from './5-Training'
import { Tokenization } from './6-Tokenization'
import { CoOcurrenceMatrix } from './7-CocurrenceMatrix'
import { DimensionalityReduction } from './8-DimensionalityReduction'
import { Analogies } from './9-Analogies'
import { Biasis } from './10-Biasis'
import { AdvancedTopics } from './11-AdvancedTopics'
import { WordEmbeddingsQuiz } from './12-Quiz'
import { WordEmbeddingsMedia } from './13-Media'
import { Products } from './14-Products'
import { NextSteps } from './15-NextSteps'
import { iModels } from '../types/ai'


interface iHome { 
    position:iPosition
    models:iModels
    user:User
    next():void
}


export interface iEmbeddings { name:string, x:number, y:number }
export const Home = ({ position: { unit, module }, models, user, next }: iHome) => {
    const [words, setWords] = useState<string[]>([])
    const [wordsMatrix, setWordsMatrix] = useState<number[][]>([])
    const [embeddings, setEmbeddings] = useState<iEmbeddings[]>([])

    const getWords = (text:string) => {
        const tokens = tokenizeWords(text) as string[]
        const lowerCase = tokens?.map((w) => w.toLowerCase())
        const uniqueWords = Array.from(new Set(lowerCase))
        const wordMap = uniqueWords.reduce((d, i, idx) => ({...d, [i]:idx}), {} as {[key:string]:number})

        setWords(uniqueWords)
        const windows = tokens.map((token, i) => ({token, window:tokens.slice(Math.max(0,i-5), i+5)}))
        const wordsMatrix = [...Array(uniqueWords.length)].map(() => [...Array(uniqueWords.length)].map(()=> 0))

        // Fill Matrix
        windows.map(({token, window}, i) => window.map((word) => wordsMatrix[wordMap[token]][wordMap[word]] += 1))
        setWordsMatrix(wordsMatrix)
        reduceMatrix(uniqueWords, wordsMatrix)
    }


    const reduceMatrix = (words:string[], wordsMatrix:number[][]) => {
        const matrix = models.pca.predict(wordsMatrix, {nComponents:2}).to2DArray()
        const vectors = words.map((word, i) => ({ word, coordinates:matrix[i] as [number, number] }))
        const embeddings = vectors.map(({ word, coordinates:[x, y] }) => ({name:word, x, y}))
        setEmbeddings(embeddings)
    }

    if(unit === 1) return <SentimentAnalysis />

    if(module === 0) return <Introduction next={next}/>
    if(module === 1) return <WordEmbeddings next={next}/>
    if(module === 2) return <Synonyms next={next} models={models} user={user}/>
    if(module === 3) return <TopicClassification next={next} models={models} user={user}/>
    if(module === 4) return <Training next={next}/>
    if(module === 5) return <Tokenization getWords={getWords} next={next}/>
    if(module === 6) return <CoOcurrenceMatrix next={next} words={words} matrix={wordsMatrix}/>
    if(module === 7) return <DimensionalityReduction next={next} embeddings={embeddings}/>
    if(module === 8) return <Analogies next={next}/>
    if(module === 9) return <Biasis next={next}/>
    if(module === 10) return <AdvancedTopics next={next}/>
    if(module === 11) return <WordEmbeddingsQuiz next={next}/>
    if(module === 12) return <WordEmbeddingsMedia next={next}/>
    if(module === 13) return <Products next={next}/>
    if(module === 14) return <NextSteps next={next}/>

    return <BorgesLanding />
}
