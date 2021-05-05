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
            style={locked ? {} : {cursor:'initial'}}
        >   { locked && <Lock/> } { name }  </a>

        {   expanded && <ul> { lessons.map((l, i) => <Lesson {...l} /> )} </ul>   }
    </li>
}


interface iUnit extends iLesson { modules?:iModule[] }
interface iMenu extends iLesson { units:iUnit[], navigate(position:iPosition):void }
export const Menu = ({ units, navigate }: iMenu) => {
    const [active, setActive] = useState<number>(user?.current.module || 0)

    const expand = (id:number) => {
        if(!user) return 
        if(user.progress.module < id) return
        setActive( id === active ? user.current.module : id)
    }

    useEffect(() => { setActive(user?.current.module as number) },[user])

    return <aside 
        className="menu column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile"
        style={{ minHeight:'calc(100vh - 85px)', width:250, boxShadow: '3px 0 3px 0 #ccc', fontSize:'1.15em' }}
    >
        <p className="menu-label"> Astroconsciencia </p>
        <ul className="menu-list">
            { modules.map(m => <Module {...m} /> )}
        </ul>
    </aside>
}
