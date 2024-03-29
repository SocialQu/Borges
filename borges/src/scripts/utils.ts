import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder'
import { PCA } from 'ml-pca'

export const similarity = (center:number[], embedding: number[]) => {
    if (center.length !== embedding.length) return Infinity
    const delta = center.reduce((d, i, idx) => d + Math.abs(i - embedding[idx]), 0)
    return delta
}

export const sortBySimilarity = (center:number[], synonymns:{embeddings:number[]}[]) => synonymns.sort(({embeddings:a}, {embeddings:b}) => 
    similarity(center, a) > similarity(center, b) ? 1 : -1
)

interface iModels { model:UniversalSentenceEncoder, pca:PCA }
interface iWordEmbedding { text:string, embeddings:number[], center:number[] }
export const getCenter = async(text:string[], {model, pca}:iModels):Promise<iWordEmbedding[]> => {
    const tensor = await model.embed(text)
    const embeddings = await tensor.array()
    const center = pca.predict(embeddings, {nComponents:2}).to2DArray()
    const wordEmbeddings = text.map((t, i) => ({ text:t, embeddings:embeddings[i], center:center[i]}))
    return wordEmbeddings
}


export const tokenizeSentences = (text:string):string[] => text.match( /[^.!?]+[.!?]+/g ) as string[]
export const tokenizeWords = (text:string) => text.replace(/[.,/#!$%^&*;:{}=\-_`~()\n]/g," ").replace(/\s{2,}/g," ").match(/(\b[^ $]+\b)/g)
