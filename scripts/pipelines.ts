import { iStoryFile, readStories } from '../../Cortazar/scripts/pipeline/reader'
import { iRawStory } from '../../Cortazar/cortazar/src/types/stories'
import { parseStories } from '../../Cortazar/scripts/pipeline/parser'
import * as use from '@tensorflow-models/universal-sentence-encoder'
import { tokenizeWords } from './functions'
import { connect } from '../scripts/db'


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


    const model = await use.load()

    const { collection, client } = await connect('Dictionary')
    

    await client.close()
}


const mapTopics = async() => {
    const { collection, client } = await connect('Topics')
    
    await client.close()
}


const similarityDistribution = async() => {
    const { collection, client } = await connect('Meta')
    
    await client.close()
}
