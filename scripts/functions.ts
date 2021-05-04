import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder'
import { similarity } from '../../Cortazar/scripts/pipeline/recommender'
import { PCA } from 'ml-pca'


interface iModels { model:UniversalSentenceEncoder, pca:PCA }
export interface iWordEmbedding { text:string, embeddings:number[], center:number[] }
export const getCenter = async(text:string[], {model, pca}:iModels):Promise<iWordEmbedding[]> => {
    const tensor = await model.embed(text)
    const embeddings = await tensor.array()
    const center = pca.predict(embeddings, {nComponents:2}).to2DArray()
    const wordEmbeddings = text.map((t, i) => ({ text:t, embeddings:embeddings[i], center:center[i]}))
    return wordEmbeddings
}


export const sortBySimilarity = (center:number[], embeddings:number[][]) => embeddings.sort((a, b) => 
    similarity(center, a) > similarity(center, b) ? 1 : -1
)

export const tokenizeWords = (text:string) => text.match(/(\b[^ $]+\b)/g)
export const tokenizeSentences = (text:string) => text.match( /[^\.!\?]+[\.!\?]+/g )
