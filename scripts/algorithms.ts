import * as use from '@tensorflow-models/universal-sentence-encoder'
import PCA_Model from '../../Cortazar/cortazar/src/data/pca.json'
import { IPCAModel, PCA } from 'ml-pca'

import { getCenter, sortBySimilarity } from './functions'
import { iWordDoc } from './pipelines'
import { connect } from './db'


export const findSynonyms = async(word:string, findAntonyms:boolean=false) => {
    const model = await use.load()
    const pca = PCA.load(PCA_Model as IPCAModel)
    const [{center, embeddings}] = await getCenter([word], {model, pca})

    const { collection, client } = await connect('Dictionary')
    const geoNear = { $geoNear: { near:center, distanceField:'distance'}}
    const limit = { $limit: 100 }
    const sort = { $sort : { distance : -1 } }
    const pipeline = findAntonyms ? [ geoNear, limit ] : [ geoNear, sort, limit ]
    const synonyms:iWordDoc[] = await collection.aggregate(pipeline).toArray()

    return sortBySimilarity(embeddings, synonyms)
    await client.close()
}


const findAnalogy = (analogy:[string, string], match:string):string[] => ['']
const computeBias = (opposites:[string, string], word:string):number => 0

interface iTopic { name:'', center:[number, number], embedding:number[] }
const topicClassification = (text:string, topics:iTopic[]):iTopic[] => topics
