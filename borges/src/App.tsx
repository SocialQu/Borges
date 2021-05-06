import { NavBar } from './components/layout/NavBar'
import { Menu } from './components/layout/Menu'

import { Home } from './views/Home'

import './App.css'

export const App = () => <div className="App">
	<NavBar />
	<Menu units={[]} navigate={() => {}}/>

	<Home lesson={0}/>

</div>
