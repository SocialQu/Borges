import * as use from '@tensorflow-models/universal-sentence-encoder'
import PCA_Model from '../../Cortazar/cortazar/src/data/pca.json'
import { similarity } from './functions'
import { IPCAModel, PCA } from 'ml-pca'

import { getCenter, sortBySimilarity } from './functions'
import { iTopicDoc, iWordDoc } from './pipelines'
import { connect } from './db'


interface iSynonyms { word:string, center:[number, number], embeddings:number[]} 
export const findSynonyms = async(word:string, findAntonyms:boolean=false):Promise<iSynonyms[]> => {
    const model = await use.load()
    const pca = PCA.load(PCA_Model as IPCAModel)
    const [{center, embeddings}] = await getCenter([word], {model, pca})

    const { collection, client } = await connect('words')
    const geoNear = { $geoNear: { near:center, distanceField:'distance'}}
    const limit = { $limit: 100 }
    const sort = { $sort : { distance : -1 } }
    const pipeline = findAntonyms ? [ geoNear, limit ] : [ geoNear, sort, limit ]
    const matches:iWordDoc[] = await collection.aggregate(pipeline).toArray()
    await client.close()

    const synonyms =  sortBySimilarity(embeddings, matches)
    return synonyms as iSynonyms[]
}

type Analogy = [string, string]
interface iAnalogy { word:string, center:[number, number], embeddings:number[]} 
export const findAnalogy = async([x, y]:Analogy, match:string):Promise<iAnalogy[]> => {
    const model = await use.load()
    const pca = PCA.load(PCA_Model as IPCAModel)
    const vectors = await getCenter([x, y, match], {model, pca})
    const [X, Y, z] = vectors

    const difference = [X.center[0] - Y.center[0], X.center[1] - Y.center[1]]
    const near = [z.center[0] - difference[0], z.center[1] - difference[1]] 


    const { collection, client } = await connect('words')
    const geoNear = { $geoNear: { near, distanceField:'distance'}}
    const limit = { $limit: 100 }
    const pipeline = [ geoNear, limit ]
    const matches:iWordDoc[] = await collection.aggregate(pipeline).toArray()
    await client.close()

    const embeddingDifference = X.embeddings.reduce((d,i) => [...d, i - Y.embeddings[i]], [] as number[])
    const embeddingCenter = z.embeddings.reduce((d,i) => [...d, i - embeddingDifference[i]], [] as number[])
    const result = sortBySimilarity(embeddingCenter, matches)

    return result as iAnalogy[]
}


type iOpposites = [string, string]
export const computeBias = async([x, y]:iOpposites, word:string):Promise<[number, number]> => {
    const model = await use.load()
    const pca = PCA.load(PCA_Model as IPCAModel)

    const vectors = await getCenter([x, y, word], {model, pca})
    const [X, Y, z] = vectors

    const xDifference = similarity(z.embeddings, X.embeddings)
    const yDifference = similarity(z.embeddings, Y.embeddings)

    const sum = xDifference + yDifference
    const bias = [Math.round(xDifference*100/sum), Math.round(yDifference*100/sum)]
    return bias as [number, number]
}


export const topicClassification = async(text:string):Promise<iTopicDoc[]> => {
    const model = await use.load()
    const pca = PCA.load(PCA_Model as IPCAModel)

    const [{ center, embeddings }] = await getCenter([text], {model, pca})

    const { collection, client } = await connect('topics')
    const geoNear = { $geoNear: { near:center, distanceField:'distance'}}
    const limit = { $limit: 100 }

    const pipeline = [ geoNear, limit ]
    const matches:iTopicDoc[] = await collection.aggregate(pipeline).toArray()
    await client.close()

    const topics =  sortBySimilarity(embeddings, matches)
    return topics as iTopicDoc[]
}
