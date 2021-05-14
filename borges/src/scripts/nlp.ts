import { similarity, sortBySimilarity, tokenizeSentences } from './utils'
import { iWordDoc, iTopicDoc } from '../types/db'
import { iModels } from '../types/ai'
import { getCenter } from './utils'
import { User } from 'realm-web'
import '@tensorflow/tfjs'


export interface iSynonym { word:string, similarity:number }
interface iRawSynonym { word:string, center:[number, number], embeddings:number[]} 

interface iFindSynonyms { word:string, user?:User, models:iModels }
export const findSynonyms = async({word, user, models:{wordsPCA, model}}: iFindSynonyms):Promise<iSynonym[]> => {
    if(!user) return []

    const [{center, embeddings}] = await getCenter([word], {model, pca:wordsPCA})
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



export interface iTopic { topic:string, similarity:number }
interface iFindiTopics { text:string, user?:User, models:iModels}
export const classifyText = async({text, models:{topicsPCA, model}, user}: iFindiTopics):Promise<iTopic[]> => {
    if(!user) return []

    const sentences = tokenizeSentences(text)
    const [{center, embeddings}] = await getCenter(sentences, {model, pca:topicsPCA})
    const matches:iTopicDoc[] = await user.functions.borgesFindTopics(center)

    const sorted =  sortBySimilarity(embeddings, matches) as iTopicDoc[]
    const minDistance = similarity(embeddings, sorted[0].embeddings)
    const maxDistance = Math.log(minDistance) + similarity(embeddings, sorted[sorted.length - 1].embeddings) - minDistance

    const topics = sorted.map(({ topic, embeddings:e }) => ({
        topic,
        similarity: Math.round((1 - (Math.log(minDistance) + similarity(embeddings, e) - minDistance)/maxDistance)*100)
    })).filter((_, i) => i < 5)

    return topics 
}
