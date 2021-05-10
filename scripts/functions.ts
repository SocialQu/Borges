import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder'
import { PCA } from 'ml-pca'


export const findCenter = (vectors: number[][]) => [...Array(vectors[0].length)]
    .map((_, idx) => vectors.reduce((d,i)=> d + i[idx], 0)/vectors.length)


export const similarity = (center:number[], embedding: number[]):number => {
    if (center.length !== embedding.length) return Infinity
    const delta = center.reduce((d, i, idx) => d + Math.abs(i - embedding[idx]), 0)
    return delta
}

export interface iModels { model:UniversalSentenceEncoder, pca:PCA }
interface iWordEmbedding { text:string, embeddings:number[], center:number[] }
export const getCenter = async(text:string[], {model, pca}:iModels):Promise<iWordEmbedding[]> => {
    const tensor = await model.embed(text)

    const embeddings = await tensor.array()
    const center = pca.predict(embeddings, {nComponents:2}).to2DArray()

    const wordEmbeddings = text.map((t, i) => ({ text:t, embeddings:embeddings[i], center:center[i]}))
    return wordEmbeddings
}


export const sortBySimilarity = (center:number[], synonymns:{embeddings:number[]}[]) => synonymns.sort(({embeddings:a}, {embeddings:b}) => 
    similarity(center, a) > similarity(center, b) ? 1 : -1
)

export const tokenizeWords = (text:string):string[] => text.match(/(\b[^ $]+\b)/g) as string[]
export const tokenizeSentences = (text:string) => text.match( /[^\.!\?]+[\.!\?]+/g )
