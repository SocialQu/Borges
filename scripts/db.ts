import { MongoClient } from 'mongodb'


require('dotenv').config()

type Collection = 'Dictionary' | 'Topics' | 'Meta'
export const connect = async(collection:Collection) => {
    const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()

    const col = await client.db('Borges').collection(collection)
    return { client, collection:col }
}
