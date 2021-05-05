/* eslint-disable jsx-a11y/anchor-is-valid */

import { CSSProperties, useEffect, useState } from "react"


const Lock = () => <img 
    alt="lock-icon"
    style={{marginTop:-8, marginRight:10, height:24, verticalAlign:'middle'}}
    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/lock-1967458-1668608.png" 
/>

interface iPosition { unit:number, module?:number, lesson?:number }
interface iLesson { 
    name:string
    locked:boolean

    active:iPosition
    position:iPosition

    style:CSSProperties
    listStyle:CSSProperties

    click(position:iPosition):void 
}

const Lesson = ({ name, locked, active, position, style, click }:iLesson) => {
    const defaultListStyle = {lineHeight: 1.25}

    return <li style={defaultListStyle} key={position.lesson}>
        <a 
            style={style} 
            onClick={() => click(position)}
            className={
                active.unit === position.unit 
                && active.module === position.module
                && active.lesson === position.lesson
                ? 'is-active': ''
            }
        > { locked && <Lock/> } { name } </a>
    </li>
}


interface iModule extends iLesson { lessons?:iLesson[], expanded:boolean }
const Module = ({name, lessons=[], locked, style, listStyle, expanded, position, click}:iModule) => {
    return <li style={{lineHeight:2, ...listStyle}} key={position.module}>
        <a 
            onClick={() => click(position)} 
            style={locked ? {...style} : {cursor:'initial', ...style}}
        >   { locked && <Lock/> } { name }  </a>

        {   expanded && <ul> { lessons.map((l, i) => <Lesson {...l} /> )} </ul>   }
    </li>
}


interface iUnit extends iLesson { modules?:iModule[] }
const Unit = ({ modules = [] }:iUnit) => <>
    <p className="menu-label"> Astroconsciencia </p>
    <ul className="menu-list">
        { modules.map(m => <Module {...m} /> )}
    </ul>
</>

interface iMenu extends iLesson { units:iUnit[], menuStyle:CSSProperties, navigate(position:iPosition):void }
export const Menu = ({ units, menuStyle, navigate }: iMenu) => {
    const defaultStyle = { minHeight:'calc(100vh - 85px)', width:250, boxShadow: '3px 0 3px 0 #ccc', fontSize:'1.15em' }

    return <aside className="menu is-hidden-mobile" style={{...defaultStyle, ...menuStyle}}>
        { units.map(u => <Unit {...u} /> ) }
    </aside>
}
