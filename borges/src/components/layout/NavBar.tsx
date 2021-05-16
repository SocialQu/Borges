/* eslint-disable jsx-a11y/anchor-is-valid */

import { useMediaQuery } from 'react-responsive'
import { useState, CSSProperties } from 'react'


interface iBrand { 
    logoSrc?:string
    brand?:string

    logoStyle?:CSSProperties
    brandStyle?:CSSProperties

    items:iNavBarItem[]
    click(tab:string):void 
}

interface iFullBrand extends iBrand { active:boolean, activate():void }
const Brand = ({ active, logoSrc='SocialQ.png', brand='SocialQ', logoStyle={}, brandStyle={}, items, click, activate }: iFullBrand) => {
    const defaultLogoStyle = { height:36, maxHeight: 'none' }
    const defaultBrandStyle = { fontSize: '2em', color:'white' }

    return <div className='navbar-brand'>
        <a className='navbar-item' onClick={() => click('HOME')}>
            <img src={logoSrc} style={{...defaultLogoStyle, ...logoStyle}} alt={`${brand} logo`}/>
            <p className='navbar-item' style={{...defaultBrandStyle, ...brandStyle}} > { brand } </p>
        </a>

        {
            items.length
            ?
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
            :   null
        }
    </div>
}


interface iNavBarItem { id:string, style?:CSSProperties, divStyle?:CSSProperties, click(tab:string):void }
export const NavBarItem = ({ id, style, divStyle, click }: iNavBarItem) => {
    return <div className={`navbar-end`} style={{fontSize: '1.2em', ...divStyle}}>
        <a 
            onClick={() => click(id)}
            className={'navbar-item'} 
            style={{textAlign:'center', ...style}}
        > 
            <strong> Iniciar Sesión </strong> 
        </a>
    </div> 
}


export type NavbarItem =  'Login' | 'Recordings' | 'Forum' | 'Home'
type NavbarClass = 'is-link' | 'is-primary' | 'is-link' | 'is-info' | 'is-success' | 
    'is-warning' | 'is-danger' | 'is-black' | 'is-dark' | 'is-light' | 'is-white'

interface iNavBar { 
    brand?:iBrand
    items?:iNavBarItem[]
    navbarClass?:NavbarClass
    navBarStyle?:CSSProperties 
    containerStyle?:CSSProperties
    click(tab:string):void
}

export const NavBar = ({brand, items=[], navbarClass='is-link', navBarStyle, containerStyle, click }: iNavBar) => {
    const midScreen = useMediaQuery({ query: '(min-width: 1024px)' })
    const [ isActive, setActive ] = useState(false)

    const defaultNavBarStyle = {borderBottom: '2px solid #ccc', padding:'0px 2.5rem'}
    const defaultContainerStyle = {maxWidth:2000, paddingLeft:midScreen ? '2.5rem' : 0, paddingRight:midScreen ? '3em' : 0}

    return <nav 
        role='navigation' 
        aria-label='main navigation' 
        className={`navbar ${navbarClass}`}
        style={{...defaultNavBarStyle, ...navBarStyle}}
    >
        <div className='container' style={{...defaultContainerStyle, ...containerStyle}}>
            <Brand {...brand} active={isActive} activate={() => setActive(!isActive)} click={click} items={items}/>

            <div 
                className={`navbar-menu ${isActive ? 'is-active navbar-menu-active': ''}`} 
                style={{ marginRight:'auto' }}
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
