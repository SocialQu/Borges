import { connect } from '../scripts/db'


const compileDictionary = async() => {
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
