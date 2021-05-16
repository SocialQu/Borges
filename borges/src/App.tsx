import * as use from '@tensorflow-models/universal-sentence-encoder'
import { Menu, iUnit, iPosition } from './components/layout/Menu'
import { App as RealmApp, User, Credentials } from 'realm-web'
import { NavBar } from './components/layout/NavBar'
import WordsPCA from './data/words-pca.json'
import TopicsPCA from './data/pca.json'
import amplitude from 'amplitude-js'

import { IPCAModel, PCA } from 'ml-pca'
import { iModels } from './types/ai'
import { Home } from './views/Home'

import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from 'react'
import 'bulma/css/bulma.css'
import './App.css'

const units:iUnit[] = [{ 
	name:'Word Embeddings', 
	modules: [
		{ name:'1. Introduction' },
		{ name:'2. What are word embeddings?' },
		{ name:'3. Application: Finding Synonyms' },
		{ name:'4. Application: Topic Classification' },
		{ name:'5. How to Train Word Embeddings?' },
		{ name:'6. Tokenization' },
		{ name:'7. Co-occurrence Matrix' },
		{ name:'8. Dimensionality Reduction' },
		{ name:'9. Application: Solving Analogies' },
		{ name:'10. Application: Detecting Biases' },
		{ name:'11. Advanced Topics' },
		{ name:'12. Quiz' },
		{ name:'13. Startups' },
		{ name:'14. Addditional Resources' },
		{ name:'15. Next Steps' },
	], 
}]


const connectMongo = async() => {
    const REALM_APP_ID = process.env.REACT_APP_REALM_ID as string
    const app = new RealmApp({ id: REALM_APP_ID })
    const user: User = await app.logIn(Credentials.anonymous())
    return user
}


export const App = () => {
    const largeScreen = useMediaQuery({ query: '(min-width: 1200px)' })

	const [ position, setPosition ] = useState<iPosition>({ unit:0 })
    const [ user, setMongoUser ] = useState<User>()
	const [ models, setModels ] = useState<iModels>()

    useEffect(() => { 
		const fetchModels = async() => {
			const model = await use.load()
			const wordsPCA = PCA.load(WordsPCA as IPCAModel)
			const topicsPCA = PCA.load(TopicsPCA as IPCAModel)
			setModels({ model, wordsPCA, topicsPCA })
		}

		fetchModels()
        connectMongo().then(mongoUser => setMongoUser(mongoUser))

        amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE_TOKEN as string)
        amplitude.getInstance().logEvent('VISIT_BORGES')
	}, [])


	const next = () => {
		const nextModule = position.module !== undefined ? position.module + 1 : 0
		const mextModuleExists = units[position.unit as number].modules[nextModule]

		if(mextModuleExists) setPosition({...position, module:nextModule})
		else window.location.href = 'https://gum.co/nlp-sentiment-analysis'
	}


	return <div className="App">
		<NavBar click={() => setPosition({unit:0})}/>
        <div className="container" style={{maxWidth:'100%'}}>
            <div className="columns" style={{margin:0}}>
				{
					largeScreen && 
						<Menu 
							units={units} 
							active={position}
							navigate={(position) => setPosition(position)}
						/>
				}

				<Home 
					position={position} 
					models={models as iModels} 
					user={user}	
					next={next} 
				/>
			</div>
		</div>
	</div>
}
