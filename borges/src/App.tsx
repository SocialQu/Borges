import { Menu, iUnit, iPosition } from './components/layout/Menu'
import { NavBar } from './components/layout/NavBar'
import { Home } from './views/Home'

import { useState } from 'react'
import './App.css'

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
		{ name:'Quiz', locked:true },
		{ name:'Best Answers', locked:true },
		{ name:'Wall of Fame', locked:true },
		{ name:'Advanced Topics', locked:true },
		{ name:'Addditional Resources', locked:true },
		{ name:'Startups', locked:true },
		{ name:'Next Steps', locked:true },
		{ name: 'References', locked:true }
	], 
}, { name:'Sentiment Analysis', modules:[] }]


export const App = () => {
	const [ units, setUnits ] = useState(Units)
	const [ position, setPosition ] = useState<iPosition>({ unit:0 })

	const next = () => {
		const nextModule = position.module ? position.module + 1 : 0
		const nextUnit = position.unit ? position.unit + 1 : 0

		if(units[position.unit as number].modules[nextModule]) setPosition({...position, module:nextModule})
		else setPosition({unit:nextModule, module:0})
	}

	return <div className="App">
		<NavBar />
		<Menu units={units} navigate={(position) => setPosition(position)}/>
		<Home position={position} next={next}/>
	</div>
}
