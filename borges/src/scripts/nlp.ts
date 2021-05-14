import { similarity, sortBySimilarity, tokenizeSentences } from './utils'
import { iWordDoc } from '../types/db'
import { iModels } from '../types/ai'
import { getCenter } from './utils'
import { User } from 'realm-web'
import '@tensorflow/tfjs'


export interface iSynonym { word:string, similarity:number }
interface iRawSynonym { word:string, center:[number, number], embeddings:number[]} 

interface iFindSynonyms { word:string, user?:User, models:iModels}
export const findSynonyms = async({word, user, models:{pca, model}}: iFindSynonyms):Promise<iSynonym[]> => {
    if(!user) return []

    const [{center, embeddings}] = await getCenter([word], {model, pca})
    const matches:iWordDoc[] = await user.functions.borgesFindSynonyms(center)

    const sorted =  sortBySimilarity(embeddings, matches) as iRawSynonym[]
    const filtered = sorted.filter(({ word:w }) => w.toLowerCase() !== word.toLowerCase())

    const minDistance = similarity(embeddings, filtered[0].embeddings)
    const maxDistance = Math.log(minDistance) + similarity(embeddings, filtered[filtered.length - 1].embeddings) - minDistance
    const synonyms = filtered.map(({ word, embeddings:e }) => ({
        word: word.charAt(0).toUpperCase() + word.slice(1),
        similarity: Math.round((1 - (Math.log(minDistance) + similarity(embeddings, e) - minDistance)/maxDistance)*100)
    }))

    return synonyms as iSynonym[]
}


interface iFindiTopics { text:string, user?:User, models:iModels}
interface iTopic { topic:string, center:[number, number], embeddings:number[]} 
export const classifyText = async({text, models:{pca, model}, user}: iFindiTopics):Promise<iTopic[]> => {
    if(!user) return []

    const sentences = tokenizeSentences(text)
    const [{center, embeddings}] = await getCenter(sentences, {model, pca})
    const matches:iTopic[] = await user.functions.borgesFindTopics(center)

    const topics =  sortBySimilarity(embeddings, matches)
    console.log('topics', topics)
    return topics as iTopic[]
}
