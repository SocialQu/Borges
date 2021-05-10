import { iStoryFile, readStories } from '../../Cortazar/scripts/pipeline/reader'
import { iRawStory } from '../../Cortazar/cortazar/src/types/stories'
import { parseStories } from '../../Cortazar/scripts/pipeline/parser'
import PCA_Model from '../../Cortazar/cortazar/src/data/pca.json'

import * as use from '@tensorflow-models/universal-sentence-encoder'
import { IPCAModel, PCA } from 'ml-pca'

import { getCenter, tokenizeWords, findCenter } from './functions'

import topics from '../../Cortazar/scripts/data/topics.json'
import { connect } from './db'


export interface iWordDoc {word:string, embeddings:number[], center:number[], frequency:number}
export const compileDictionary = async() => {
    const files:iStoryFile[] = await readStories('../../Cortazar/scripts/data/stories', [])
    let Words:string[] = []

    for (const { payload } of files) {
        const parsedStories:iRawStory[] = parseStories(payload.references)
        const text:string = parsedStories.map(({title, subtitle, intro}) => 
            `${title} ${subtitle} ${intro.join(' ')}`
        ).join(' ')

        const words = tokenizeWords(text)
        Words = [...Words, ...words]
    }

    const wordMap = Words.reduce((d, i) => ({...d, [i]: d[i] ? d[i]+1 : 1 }), {}  as {[word:string]: number})
    const wordFrequency = Object.entries(wordMap).map(([k,v])=> ({word:k, count:v}))
    const sortedWords = wordFrequency.sort(({ count:a, count:b}) => a > b ? -1 : 1)
    const topWords = sortedWords.filter((_, i) => i > 100 && i < 1000)
    const dictionary = topWords.map(({ word }) => word)

    const model = await use.load()
    const pca = PCA.load(PCA_Model as IPCAModel)
    const wordEmbeddings = await getCenter(dictionary, {model, pca})
    const wordDocuments:iWordDoc[] = wordEmbeddings.map(({text, ...vector}) => ({...vector, word:text, frequency:wordMap[text]}))

    const { collection, client } = await connect('words')
    await collection.insertMany(wordDocuments)
    await client.close()
}


export interface iTopicDoc {name:string, embeddings:number[], center:number[]}
export const mapTopics = async() => {
    const files:iStoryFile[] = await readStories('../../Cortazar/scripts/data/stories', [])
    const Topics:{[topic:string]:string[]} = {}

    for (const { payload } of files) {
        const parsedStories:iRawStory[] = parseStories(payload.references)
        parsedStories.map(({ topics, intro, title, subtitle }) => 
            topics.map(t => Topics[t] 
                ? Topics[t] = [...Topics[t], ...intro, title, subtitle] 
                : Topics[t] = [...intro, title, subtitle])
        )
    }

    const model = await use.load()
    const pca = PCA.load(PCA_Model as IPCAModel)
    const docs:iTopicDoc[] = []

    for (const [topic, sentences] of Object.entries(Topics)) {
        const embeddings = await getCenter(sentences, {model, pca})
        const doc = { 
            name:topic, 
            center: findCenter(embeddings.map(({center})=> center)),
            embeddings: findCenter(embeddings.map(({embeddings})=> embeddings))
        }

        docs.push(doc)
    }

    const { collection, client } = await connect('topics')
    await collection.insertMany(docs)
    await client.close()
}


export const similarityDistribution = async() => {
    // const { collection, client } = await connect('')
    
    // await client.close()
}


export const centerTopics = async() => {
    const { client, collection:Stories } = await connect('stories')
    const Topics = client.db('Cortazar').collection('topics')
    const pca = PCA.load(PCA_Model as IPCAModel)

    for (const t of topics) {
        const topic = t.replace('-', ' ')
        const stories = await Stories.find({ topics: topic }).toArray()

        console.log(t, topic, stories.length)
        if (!stories.length) continue

        const embeddings = findCenter(stories.map(({embeddings}) => embeddings))
        const center = pca.predict([embeddings], {nComponents:2}).to2DArray()[0]
        await Topics.updateOne({ topic }, { $set:{ topic, embeddings, center }}, { upsert:true })
    }

    // client.db('Borges').collection('topics')
    await client.close()
}