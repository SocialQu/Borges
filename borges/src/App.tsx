import * as use from '@tensorflow-models/universal-sentence-encoder'
import { Menu, iUnit, iPosition } from './components/layout/Menu'
import { App as RealmApp, User, Credentials } from 'realm-web'
import { NavBar } from './components/layout/NavBar'
import { IPCAModel, PCA } from 'ml-pca'
import pcaModel from './data/pca.json'
import { iModels } from './types/ai'
import { Home } from './views/Home'

import { useEffect, useState } from 'react'
import 'bulma/css/bulma.css'
import './App.css'

const Units:iUnit[] = [{ 
	name:'Word Embeddings', 
	modules: [
		{ name:'Introduction' },
		{ name:'What are word embeddings?' },
		{ name:'Application: Finding Synonyms' },
		{ name:'Application: Topic Classification' },
		{ name:'How to Train Word Embeddings?' },
		{ name:'Tokenization' },
		{ name:'Co-occurrence Matrix' },
		{ name:'Dimensionality Reduction' },
		{ name:'Application: Solving Analogies' },
		{ name:'Application: Detecting Biasis' },
		{ name:'Advanced Topics' },
		{ name:'Quiz' },
		{ name:'Startups' },
		{ name:'Addditional Resources' },
		{ name:'Next Steps' },
	], 
}]


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
	const [ models, setModels ] = useState<iModels>()

    useEffect(() => { 
		const fetchModels = async() => {
			const model = await use.load()
			const pca = PCA.load(pcaModel as IPCAModel)
			setModels({ model, pca })
		}

		fetchModels()
		return

        connectMongo().then(mongoUser => setMongoUser(mongoUser))
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
        <div className="container" style={{maxWidth:'100%'}}>
            <div className="columns" style={{margin:0}}>
				<Menu 
					units={units} 
					active={position}
					navigate={(position) => setPosition(position)}
				/>

				<Home 
					position={position} 
					models={models as iModels} 
					user={user as User}	
					reset={reset}
					next={next} 
				/>
			</div>
		</div>
	</div>
}
