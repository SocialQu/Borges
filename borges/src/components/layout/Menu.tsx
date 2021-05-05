/* eslint-disable jsx-a11y/anchor-is-valid */

import { CSSProperties, useEffect, useState } from "react"


const Lock = () => <img 
    alt="lock-icon"
    style={{marginTop:-8, marginRight:10, height:24, verticalAlign:'middle'}}
    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/lock-1967458-1668608.png" 
/>

interface iPosition { unit:number, module?:number, lesson?:number }
interface iNavigation { active:iPosition, position:iPosition, navigate(position:iPosition):void }
interface iMenuStyles {
    lessonStyle?:CSSProperties
    lessonListStyle?:CSSProperties

    moduleStyle?:CSSProperties
    moduleListStyle?:CSSProperties

    unitStyle?:CSSProperties
    unitListStyle?:CSSProperties
}


interface iLesson { name:string, locked:boolean }
interface iFullLesson { lesson:iLesson, styles:iMenuStyles, navigation:iNavigation }
const Lesson = ({ 
    lesson:{ name, locked }, 
    styles:{ lessonStyle, lessonListStyle }, 
    navigation: {active:{unit, module, lesson}, position, navigate},
}: iFullLesson) => <li style={{lineHeight: 1.25, ...lessonListStyle}}>
    <a 
        style={lessonStyle} 
        onClick={() => navigate(position)}
        className={ unit === position.unit && module === position.module && lesson === position.lesson ? 'is-active': '' }
    > { locked && <Lock/> } { name } </a>
</li>



interface iModule extends iLesson { lessons:iLesson[] }
interface iFullModule { 
    module: iModule
    expanded: boolean
    styles: iMenuStyles
    navigation:iNavigation
}

const Module = ({
    expanded, 
    module:{name, locked, lessons}, 
    styles: {moduleStyle, moduleListStyle, ...styles}, 
    navigation: {active:{unit:u, module:m, lesson:l}, position, navigate},
}:iFullModule) => <li style={{lineHeight:2, ...moduleListStyle}} key={position.module}>
    <a 
        onClick={() => navigate(position)} 
        style={locked ? {...moduleStyle} : {cursor:'initial', ...moduleStyle}}
        className={ u === position.unit && m === position.module && l === position.lesson ? 'is-active': '' }
    >   { locked && <Lock/> } { name }  </a>

    {   
        expanded && 
        <ul> 
            { 
                lessons.map((lesson) => <Lesson 
                        lesson={lesson} 
                        styles={styles} 
                        navigation={{active:{unit:u, module:m, lesson:l}, position, navigate}}
                    /> 
                )
            } 
        </ul>   
    }
</li>



interface iUnit extends iModule { modules:iModule[] }
interface iFullUnit { 
    unit: iUnit
    expanded: boolean
    styles: iMenuStyles
    navigation:iNavigation
}

const Unit = ({ 
    expanded,
    unit:{name, modules},
    styles:{unitStyle, unitListStyle, ...styles},
    navigation:{ active, position, navigate}
}:iFullUnit) => <>
    <a 
        style={unitStyle} 
        className="menu-label" 
        onClick={() => navigate(position)}
    > { name } </a>
    <ul className="menu-list">
        { 
            active && modules.map(module => <Module 
                    module={module} 
                    expanded={expanded}
                    styles={styles}
                    navigation={{active, position, navigate}}
                /> 
            )
        }
    </ul>
</>



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
        { 
            units.map(unit => <Unit 

                    unit={unit}
                /> 
            ) 
        }
    </aside>
}
