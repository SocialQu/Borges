import { iWordDoc } from '../types/db'
import { iModels } from '../types/ai'
import { getCenter } from './utils'
import { User } from 'realm-web'


const similarity = (center:number[], embedding: number[]) => {
    if (center.length !== embedding.length) return Infinity
    const delta = center.reduce((d, i, idx) => d + Math.abs(i - embedding[idx]), 0)
    return delta
}

const sortBySimilarity = (center:number[], synonymns:{embeddings:number[]}[]) => synonymns.sort(({embeddings:a}, {embeddings:b}) => 
    similarity(center, a) > similarity(center, b) ? 1 : -1
)


interface iFindSynonyms { word:string, user:User, models:iModels}
interface iSynonyms { word:string, center:[number, number], embeddings:number[]} 
export const findSynonyms = async({word, user, models:{pca, model}}: iFindSynonyms):Promise<iSynonyms[]> => {
    const [{center, embeddings}] = await getCenter([word], {model, pca})
    const matches:iWordDoc[] = await user.functions.borgesSynonyms(center)

    const synonyms =  sortBySimilarity(embeddings, matches)
    return synonyms as iSynonyms[]
}
