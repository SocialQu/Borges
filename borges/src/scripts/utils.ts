import { iModels } from '../types/ai'


interface iWordEmbedding { text:string, embeddings:number[], center:number[] }
export const getCenter = async(text:string[], {model, pca}:iModels):Promise<iWordEmbedding[]> => {
    const tensor = await model.embed(text)
    const embeddings = await tensor.array()
    const center = pca.predict(embeddings, {nComponents:2}).to2DArray()
    const wordEmbeddings = text.map((t, i) => ({ text:t, embeddings:embeddings[i], center:center[i]}))
    return wordEmbeddings
}

