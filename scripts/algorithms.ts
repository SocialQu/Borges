import * as use from '@tensorflow-models/universal-sentence-encoder'
import PCA_Model from '../../Cortazar/cortazar/src/data/pca.json'
import { IPCAModel, PCA } from 'ml-pca'

import { getCenter, sortBySimilarity } from './functions'
import { iWordDoc } from './pipelines'
import { connect } from './db'


interface iSynonyms { word:string, center:[number, number], embeddings:number[]} 
export const findSynonyms = async(word:string, findAntonyms:boolean=false):Promise<iSynonyms[]> => {
    const model = await use.load()
    const pca = PCA.load(PCA_Model as IPCAModel)
    const [{center, embeddings}] = await getCenter([word], {model, pca})

    const { collection, client } = await connect('Dictionary')
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
const findAnalogy = async([x, y]:Analogy, match:string):Promise<iAnalogy[]> => {
    const model = await use.load()
    const pca = PCA.load(PCA_Model as IPCAModel)
    const vectors = await getCenter([x, y, match], {model, pca})
    const [X, Y, z] = vectors

    const difference = [X.center[0] - Y.center[0], X.center[1] - Y.center[1]]
    const near = [z.center[0] - difference[0], z.center[1] - difference[1]] 


    const { collection, client } = await connect('Dictionary')
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



const computeBias = (opposites:[string, string], word:string):number => 0

interface iTopic { name:'', center:[number, number], embedding:number[] }
const topicClassification = (text:string, topics:iTopic[]):iTopic[] => topics
