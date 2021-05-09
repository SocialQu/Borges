import * as use from '@tensorflow-models/universal-sentence-encoder'
import { Menu, iUnit, iPosition } from './components/layout/Menu'
import { App as RealmApp, User, Credentials } from 'realm-web'
import { NavBar } from './components/layout/NavBar'
import { IPCAModel, PCA } from 'ml-pca'
import pcaModel from './data/pca.json'
import { Home } from './views/Home'

import { useEffect, useState } from 'react'
import './App.css'
import { iModels } from './types/ai'

const Units:iUnit[] = [{ 
	name:'Word Embeddings', 
	modules: [
		{ name:'Introduction', locked:true },
		{ name:'What are word embeddings?', locked:true },
		{ name:'Application: Finding Synonyms', locked:true },
		{ name:'Topic Classification', locked:true },
		{ name:'How to train Word Embeddings?', locked:true },
		{ name:'Tokenization', locked:true },
		{ name:'Co-ocurrence Matrix', locked:true },
		{ name:'Dimensionality Reduction', locked:true },
		{ name:'Application: Solving the Analogy', locked:true },
		{ name:'Application: Detecting Biasis', locked:true },
		{ name:'Advanced Topics', locked:true },
		{ name:'Quiz', locked:true },
		{ name:'Startups', locked:true },
		{ name:'Addditional Resources', locked:true },
		{ name:'Next Steps', locked:true },
	], 
}, { name:'Sentiment Analysis', modules:[] }]


const unlockModule = (units:iUnit[], position:iPosition, nextModule:number) => units.map((u, i) => 
	i === position.unit 
	? 	{ 
			...u, 
			modules: u.modules.map((m, id) => 
				id === nextModule 
				? 	{...m, locked:false } 
				: 	m
			) 
		} 
	: u
)

const connectMongo = async() => {
    const REALM_APP_ID = process.env.REACT_APP_REALM_ID as string
    const app = new RealmApp({ id: REALM_APP_ID })
    const user: User = await app.logIn(Credentials.anonymous())
    return user
}


export const App = () => {
	const [ units, setUnits ] = useState(Units)
	const [ position, setPosition ] = useState<iPosition>({ unit:0 })
    const [ user, setMongoUser ] = useState<User>()
    const [ db, setDB ] = useState<Realm.Services.MongoDBDatabase>()
	const [ models, setModels ] = useState<iModels>()

    useEffect(() => { 
        connectMongo().then(mongoUser => {
            setMongoUser(mongoUser)
			const mongoAtlas = process.env.REACT_APP_MONGODB_ATLAS as string
            const mongo = mongoUser.mongoClient(mongoAtlas)
            const db = mongo.db('Borges')
            setDB(db)
        })

		const fetchModels = async() => {
			const model = await use.load()
			const pca = PCA.load(pcaModel as IPCAModel)
			setModels({ model, pca })
		}

		fetchModels()
    }, [])


	const next = () => {
		const nextModule = position.module ? position.module + 1 : 0
		const nextUnit = position.unit ? position.unit + 1 : 0

		if(units[position.unit as number].modules[nextModule]) {
			setPosition({...position, module:nextModule})
			const newUnits = unlockModule([...units], position, nextModule)
			setUnits(newUnits)

		} else setPosition({unit:nextUnit, module:0})
	}

	const reset = () => setPosition({unit:0, module:0})

	return <div className="App">
		<NavBar />
		<Menu units={units} navigate={(position) => setPosition(position)}/>
		<Home 
			position={position} 
			models={models as iModels} 
			user={user as User}	
			reset={reset}
			next={next} 
		/>
	</div>
}
