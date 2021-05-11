import { sortBySimilarity, tokenizeSentences } from './utils'
import { iWordDoc } from '../types/db'
import { iModels } from '../types/ai'
import { getCenter } from './utils'
import { User } from 'realm-web'
import '@tensorflow/tfjs'

interface iFindSynonyms { word:string, user:User, models:iModels}
interface iSynonyms { word:string, center:[number, number], embeddings:number[]} 
export const findSynonyms = async({word, user, models:{pca, model}}: iFindSynonyms):Promise<iSynonyms[]> => {
    const [{center, embeddings}] = await getCenter([word], {model, pca})
    const matches:iWordDoc[] = await user.functions.borgesFindSynonyms(center)

    const synonyms =  sortBySimilarity(embeddings, matches)
    return synonyms as iSynonyms[]
}


interface iFindiTopics { text:string, user:User, models:iModels}
interface iTopic { topic:string, center:[number, number], embeddings:number[]} 
export const classifyText = async({text, models:{pca, model}, user}: iFindiTopics):Promise<iTopic[]> => {
    const sentences = tokenizeSentences(text)
    const [{center, embeddings}] = await getCenter(sentences, {model, pca})
    const matches:iTopic[] = await user.functions.borgesFindSynonyms(center)

    const topics =  sortBySimilarity(embeddings, matches)
    return topics as iTopic[]
}
