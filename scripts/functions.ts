import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder'
import { similarity } from '../../Cortazar/scripts/pipeline/recommender'
import { PCA } from 'ml-pca'


interface iModels { model:UniversalSentenceEncoder, pca:PCA }
export const getCenter = async(text:string[], {model, pca}:iModels) => {
    const embeddings = await model.embed(text)
    const vectors = await embeddings.array()
    const center = pca.predict(vectors, {nComponents:2}).to2DArray()
    return {embeddings, center}
}


export const sortBySimilarity = (center:number[], embeddings:number[][]) => embeddings.sort((a, b) => 
    similarity(center, a) > similarity(center, b) ? 1 : -1
)

export const tokenizeWords = (text:string) => text.match(/(\b[^ $]+\b)/g)
export const tokenizeSentences = (text:string) => text.match( /[^\.!\?]+[\.!\?]+/g )
