/* eslint-disable jsx-a11y/anchor-is-valid */

import { useMediaQuery } from 'react-responsive'
import { useState } from 'react'


interface iBrand { 
    active:boolean

    logoSrc:string
    brand?:string

    logoStyle:React.CSSProperties
    brandStyle:React.CSSProperties

    click():void
    activate():void 
}

export const Brand = ({ active, logoSrc, brand='', logoStyle, brandStyle, click, activate }: iBrand) => {
    const defaultLogoStyle = { height:36, maxHeight: 'none' }
    const defaultBrandStyle = { fontSize: '2em', color:'white' }

    return <div className='navbar-brand'>
        <a className='navbar-item' onClick={click}>
            <img src={logoSrc} style={{...defaultLogoStyle, ...logoStyle}} alt={'NavBar logo'}/>
            <p className='navbar-item' style={{...defaultBrandStyle, ...brandStyle}} > { brand } </p>
        </a>

        <a 
            role='button' 
            className={`navbar-burger ${active ? 'is-active': ''}`}
            style={{ marginTop:'auto', marginBottom: 'auto'}}
            aria-label='menu' 
            aria-expanded='false' 
            data-target='navbarBasicExample'
            onClick={activate}
        >
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
        </a>
    </div>
}


export type NavbarItem =  'Login' | 'Recordings' | 'Forum' | 'Home'
interface iNavBar { brand:iBrand, click(item:NavbarItem):void }
export const NavBar = ({ brand, click }: iNavBar) => {
    const midScreen = useMediaQuery({ query: '(min-width: 1024px)' })
    const [ isActive, setActive ] = useState(false)

    return <nav 
        className='navbar is-link' 
        role='navigation' 
        aria-label='main navigation' 
        style={{borderBottom: '2px solid #ccc', backgroundColor:'darkblue', padding:'0px 2.5rem'}}
    >
        <div className='container' style={{maxWidth:2000, paddingLeft:midScreen ? '2.5rem' : 0, paddingRight:midScreen ? '3em' : 0 }}>
            <Brand {...brand}/>

            <div 
                className={`navbar-menu ${isActive ? 'is-active navbar-menu-active': ''}`} 
                style={{ marginRight:'auto', backgroundColor:'darkblue' }}
            >
                <div className={`navbar-end `} style={{fontSize: '1.2em', backgroundColor:'darkblue'}} >
                    <a 
                        onClick={() => click('Login')} 
                        className={'navbar-item'} 
                        style={{textAlign:'center', color:'white', backgroundColor:'darkblue'}}
                    > 
                        <strong> Iniciar Sesión </strong> 
                    </a>
                </div> 

                <div className={`navbar-end `} style={{fontSize: '1.2em', backgroundColor:'darkblue'}}>
                    <a 
                        onClick={() => click('Forum')} 
                        className={'navbar-item'}
                        style={{textAlign:'center', color:'white', backgroundColor:'darkblue'}}
                    > 
                        <strong> Forum </strong> 
                    </a>                    
                </div>

                <div className={`navbar-end `} style={{fontSize: '1.2em', marginLeft:'initial', backgroundClip:'darkblue'}}>
                    <a 
                        onClick={() => click('Recordings')} 
                        className={'navbar-item'}
                        style={{textAlign:'center', color:'white', backgroundColor:'darkblue'}}
                    > 
                        <strong> Grabaciones </strong> 
                    </a>
                </div>
            </div>
        </div>
    </nav>
}
