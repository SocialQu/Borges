import { iStoryFile, readStories } from '../../Cortazar/scripts/pipeline/reader'
import { iRawStory } from '../../Cortazar/cortazar/src/types/stories'
import { parseStories } from '../../Cortazar/scripts/pipeline/parser'
import PCA_Model from '../../Cortazar/cortazar/src/data/pca.json'
import PCA_WORDS from '../borges/src/data/words-pca.json'


import * as use from '@tensorflow-models/universal-sentence-encoder'
import { IPCAModel, PCA } from 'ml-pca'

import { getCenter, tokenizeWords, findCenter, similarity } from './functions'
import { promises as fs } from 'fs'

import topics from '../../Cortazar/scripts/data/topics.json'
import dictionary from './data/words.json'
import { connect } from './db'
import '@tensorflow/tfjs-node'

const PCA_ROOT = './data/words-pca.json'

export interface iWordDoc {word:string, embeddings:number[], center:number[], frequency?:number}
export const buildDictionary = async() => {
    const files:iStoryFile[] = await readStories('../../Cortazar/scripts/data/stories', [])
    let Words:string[] = []

    console.log('Files:', files.length)
    for (const { payload } of files) {
        const parsedStories:iRawStory[] = parseStories(payload.references)
        const text:string = parsedStories.map(({title, subtitle, intro}) => 
            `${title} ${subtitle} ${intro.join(' ')}`
        ).join(' ')

        const words = tokenizeWords(text)
        Words = [...Words, ...words.map(word => word.toLowerCase())]
    }

    console.log('Words:', Words.length)

    // Count the frequency of each word.
    const wordMap:{[word: string]: number} = Words.reduce((d, i, idx) => {
        if(idx%1000 === 0) console.log(idx)
        return {...d, [i]: d[i] ? d[i]+1 : 1 }
    }, {}  as {[word:string]: number})
    console.log('Word Map')

    // Turn the word map into a list
    const wordFrequency:{word: string; count: number}[] = Object.entries(wordMap).map(([k,v])=> ({word:k, count:v}))
    console.log('Word Frequency', wordFrequency.length)

    // Sort Words by Frequency.
    wordFrequency.sort(({ count:a },{ count:b }) => a > b ? -1 : 1)
    await fs.writeFile('./data/words.json', JSON.stringify(wordFrequency))
    return 
}

export const embedDictionary = async() => {
    const model = await use.load()
    const pca = PCA.load(PCA_WORDS as IPCAModel)

    const { collection, client } = await connect('words')

    // await collection.deleteMany({})
    const docs = await collection.find({}).toArray()
    console.log(docs.length)

    for(const i in [...Array(10)]){
        if (Number(i) < 7) continue
        const words = dictionary.filter((_, idx) => idx > Number(i)*1000 && idx <= (Number(i)+1)*1000)
        const wordEmbeddings = await getCenter(words, {model, pca})
        const wordDocuments:iWordDoc[] = wordEmbeddings.map(({text, ...vector}) => ({...vector, word:text }))
        await collection.insertMany(wordDocuments)
        console.log(i)
    }

    console.log((await collection.find({}).toArray()).length)
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


export const similarityComparisson = async() => {
    const model = await use.load()
    const pca_model = PCA.load(PCA_Model as IPCAModel)
    const dataset = dictionary.filter((_, idx) => idx > 0 && idx <= 2000 && Math.random() < 0.1)
    console.log('Dataset Length:', dataset.length)

    const corpus = await getCenter(dataset, {model, pca:pca_model})
    const pca = new PCA(corpus.map(({ embeddings }) => embeddings))
    await fs.writeFile(PCA_ROOT, JSON.stringify(pca))

    console.log('New PCA')

    const words = ['good', 'bad', 'well', 'right', 'great', 'sad', 'happy', 'test', 'rough']
    const embeddings = await getCenter(words, {model, pca})

    embeddings.map(({ embeddings:e, text, center:c }) => {
        console.log(text, similarity(embeddings[0].embeddings, e), similarity(embeddings[0].center, c), c)
    })
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
