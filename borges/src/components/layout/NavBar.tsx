/* eslint-disable jsx-a11y/anchor-is-valid */

import { useMediaQuery } from 'react-responsive'
import { useState, CSSProperties } from 'react'


interface iBrand { 
    logoSrc:string
    brand?:string

    logoStyle:CSSProperties
    brandStyle:CSSProperties

    click?():void 
}

interface iFullBrand extends iBrand { active:boolean, activate():void }
const Brand = ({ active, logoSrc, brand='', logoStyle, brandStyle, click, activate }: iFullBrand) => {
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


interface iNavBarItem { style:CSSProperties, divStyle:CSSProperties, click():void }
export const NavBarItem = ({ style, divStyle, click }: iNavBarItem) => {
    return <div className={`navbar-end`} style={{fontSize: '1.2em', ...divStyle}}>
        <a 
            onClick={click}
            className={'navbar-item'} 
            style={{textAlign:'center', ...style}}
        > 
            <strong> Iniciar Sesión </strong> 
        </a>
    </div> 
}


export type NavbarItem =  'Login' | 'Recordings' | 'Forum' | 'Home'
interface iNavBar { brand:iBrand, items:iNavBarItem[], click(item:NavbarItem):void }
export const NavBar = ({brand, items, click }: iNavBar) => {
    const midScreen = useMediaQuery({ query: '(min-width: 1024px)' })
    const [ isActive, setActive ] = useState(false)

    return <nav 
        className='navbar is-link' 
        role='navigation' 
        aria-label='main navigation' 
        style={{borderBottom: '2px solid #ccc', backgroundColor:'darkblue', padding:'0px 2.5rem'}}
    >
        <div className='container' style={{maxWidth:2000, paddingLeft:midScreen ? '2.5rem' : 0, paddingRight:midScreen ? '3em' : 0 }}>
            <Brand {...brand} active={isActive} activate={() => setActive(!isActive)}/>

            <div 
                style={{ marginRight:'auto', backgroundColor:'darkblue' }}
                className={`navbar-menu ${isActive ? 'is-active navbar-menu-active': ''}`} 
            >
                { 
                    items.map(({style, ...item}, idx, l) => 
                        <NavBarItem 
                            {...item} 
                            style={(idx + 1) !== l.length ? style : {...style, marginLeft:'initial'}}
                        />
                    )
                }
            </div>
        </div>
    </nav>
}
