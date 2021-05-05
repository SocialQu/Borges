/* eslint-disable jsx-a11y/anchor-is-valid */

import { CSSProperties, useEffect, useState } from "react"


const Lock = () => <img 
    alt="lock-icon"
    style={{marginTop:-8, marginRight:10, height:24, verticalAlign:'middle'}}
    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/lock-1967458-1668608.png" 
/>

interface iPosition { unit:number, module?:number, lesson?:number }
interface iMenuStyles {
    lessonStyle:CSSProperties
    lessonListStyle:CSSProperties

    moduleStyle:CSSProperties
    moduleListStyle:CSSProperties

    unitStyle:CSSProperties
    unitListStyle:CSSProperties
}


interface iLesson { name:string, locked:boolean, active:boolean }
interface iFullLesson { 
    lesson: iLesson
    position: iPosition
    styles: iMenuStyles
    navigate(position:iPosition):void 
}

const Lesson = ({ 
    position, 
    lesson:{ name, locked, active}, 
    styles:{ lessonStyle, lessonListStyle }, 
    navigate 
}: iFullLesson) => <li style={{lineHeight: 1.25, ...lessonListStyle}}>
    <a 
        style={lessonStyle} 
        onClick={() => navigate(position)}
        className={ active ? 'is-active': '' }
    > { locked && <Lock/> } { name } </a>
</li>



interface iModule extends iLesson { lessons:iLesson[] }
interface iFullModule { 
    module: iModule
    expanded: boolean
    position: iPosition
    styles: iMenuStyles
    navigate(position:iPosition):void 
}

const Module = ({
    module:{name, active, locked, lessons }, 
    expanded, 
    position, 
    styles: {moduleStyle, moduleListStyle}, 
    navigate
}:iFullModule) => <li style={{lineHeight:2, ...moduleListStyle}} key={position.module}>
    <a 
        onClick={() => navigate(position)} 
        style={locked ? {...moduleStyle} : {cursor:'initial', ...moduleStyle}}
    >   { locked && <Lock/> } { name }  </a>

    {   expanded && <ul> { lessons.map((l) => <Lesson {...l} /> )} </ul>   }
</li>



const Unit = ({ name, modules = [], click }:iUnit) => <>
    <a className="menu-label" onClick={() => click(position)}> { name } </a>
    <ul className="menu-list">
        { modules.map(m => <Module {...m} /> )}
    </ul>
</>



interface iUnit extends iModule { modules:iModule[] }
interface iMenu {
    units: iUnit[]
    activeItem?: iPosition

    lessonStyle?: CSSProperties
    listLessonStyle?: CSSProperties
    moduleStyle?: CSSProperties
    listModuleStyle?: CSSProperties
    menuStyle?: CSSProperties

    navigate(position:iPosition): void
}

export const Menu = ({ units, menuStyle, navigate }: iMenu) => {
    const defaultStyle = { minHeight:'calc(100vh - 85px)', width:250, boxShadow: '3px 0 3px 0 #ccc', fontSize:'1.15em' }

    return <aside className="menu is-hidden-mobile" style={{...defaultStyle, ...menuStyle}}>
        { units.map(u => <Unit {...u} /> ) }
    </aside>
}
