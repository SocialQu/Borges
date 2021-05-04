import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder'
import { similarity } from '../../Cortazar/scripts/pipeline/recommender'


export const getCenter = async(text:string[], model: UniversalSentenceEncoder) => {
    const embeddings  = await model.embed(text)
    return embeddings
}


export const sortBySimilarity = (center:number[], embeddings:number[][]) => embeddings.sort((a, b) => 
    similarity(center, a) > similarity(center, b) ? 1 : -1
)

export const tokenizeWords = (text:string) => text.match(/(\b[^ $]+\b)/g)
export const tokenizeSentences = (text:string) => text.match( /[^\.!\?]+[\.!\?]+/g )
