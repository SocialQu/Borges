/* eslint-disable jsx-a11y/anchor-is-valid */

import { CSSProperties, useEffect, useState } from "react"


const Lock = () => <img 
    alt="lock-icon"
    style={{marginTop:-8, marginRight:10, height:24, verticalAlign:'middle'}}
    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/lock-1967458-1668608.png" 
/>

export interface iPosition { unit?:number, module?:number, lesson?:number }
interface iNavigation { active:iPosition, navigate(position:iPosition):void }
interface iMenuStyles {
    lessonStyle?:CSSProperties
    lessonListStyle?:CSSProperties

    moduleStyle?:CSSProperties
    moduleListStyle?:CSSProperties

    unitStyle?:CSSProperties
    unitListStyle?:CSSProperties
    menuStyle?:CSSProperties
}


interface iLesson { name:string, locked?:boolean }
interface iMenuLesson extends iLesson { position:iPosition }
interface iFullLesson { lesson:iMenuLesson, styles:iMenuStyles, navigation:iNavigation }
const Lesson = ({ 
    lesson:{ name, locked, position }, 
    styles:{ lessonStyle, lessonListStyle }, 
    navigation: {active:{unit, module, lesson}, navigate},
}: iFullLesson) => <li style={{lineHeight: 1.25, ...lessonListStyle}}>
    <a 
        style={lessonStyle} 
        onClick={() => navigate(position)}
        className={ unit === position.unit && module === position.module && lesson === position.lesson ? 'is-active': '' }
    > { locked && <Lock/> } { name } </a>
</li>


interface iModule extends iLesson { lessons?:iLesson[] }
interface iMenuModule extends iMenuLesson { lessons?:iMenuLesson[] }
interface iFullModule {  module: iMenuModule, expanded?: iPosition, styles: iMenuStyles, navigation:iNavigation }
const Module = ({
    expanded={}, 
    module:{name, locked, position, lessons }, 
    styles: {moduleStyle, moduleListStyle, ...styles}, 
    navigation: {active:{unit:u, module:m, lesson:l}, navigate},
}:iFullModule) => <li style={{lineHeight:2, ...moduleListStyle}}>
    <a 
        onClick={() => navigate(position)} 
        style={!locked ? {...moduleStyle} : {cursor:'initial', ...moduleStyle}}
        className={ u === position.unit && m === position.module && l === position.lesson ? 'is-active': '' }
    >   
        { locked && <Lock/> } 
        {  
            name.includes('Application:') 
            ? <><strong> { name.split(/Application:/)[0] } Application: </strong> { name.split(/Application:/)[1] } </>
            : name.includes('Quiz') ? <strong> { name } </strong> : name
        }
    </a>

    {   
        (
            (u === position.unit && m === position.module) 
            || (expanded.unit === position.unit && expanded.module === position.module)
        ) &&  <ul> 
            { 
                lessons?.map((lesson) => <Lesson 
                        lesson={lesson} 
                        styles={styles} 
                        navigation={{active:{unit:u, module:m, lesson:l}, navigate}}
                    /> 
                )
            } 
        </ul>   
    }
</li>


export interface iUnit extends iLesson { modules:iModule[] }
interface iMenuUnit extends iMenuLesson { modules:iMenuModule[] }
interface iFullUnit { unit:iMenuUnit, expanded?:iPosition, styles:iMenuStyles, navigation:iNavigation }
const Unit = ({ 
    expanded,
    unit:{name, modules, position},
    styles:{unitStyle, unitListStyle, ...styles},
    navigation:{ active, navigate}
}:iFullUnit) => <>
    <p 
        style={unitStyle} 
        className="menu-label" 
        onClick={() => navigate(position)}
    > { name } </p>

    { 
        <ul className="menu-list" style={{marginBottom:'2rem'}}>
            {
                modules.map((module, k) => 
                    <Module 
                        key={k}
                        module={module} 
                        expanded={expanded}
                        styles={styles}
                        navigation={{active, navigate}}
                    /> 
                )
            }
        </ul>
    }
</>


interface iMenu {
    lock?:boolean
    units: iUnit[]
    active: iPosition
    styles?: iMenuStyles
    navigate(position:iPosition): void
}

export const Menu = ({ active, units, styles:{menuStyle, ...styles}={}, navigate }: iMenu) => {
    const [menuUnits, setMenuUnits] = useState<iMenuUnit[]>()
    const [expanded, setExpanded] = useState<iPosition>()

    useEffect(() => {
        const mappedUnits:iMenuUnit[] = units.map((unit,i) => ({
            ...unit, 
            position: {unit:i},
            modules: unit.modules.map((module, id) => ({
                ...module,
                position: {unit:i, module:id},
                lessons: module.lessons?.map((l, idx) => ({
                    ...l,
                    position: {unit:i,module:id, lesson:idx}
                } ))
            } ))
        }) as iMenuUnit)

        setMenuUnits(mappedUnits)
    }, [units, active])


    const defaultStyle:CSSProperties = { 
        minHeight:'calc(100vh - 85px)', 
        boxShadow: '3px 0 3px 0 #ccc', 
        fontSize:'1.15em',
        textAlign:'left',
        width:300,
    }

    const handleClick = ({unit, module, lesson}:iPosition) => {
        if(unit && units[unit].locked) return
        if(unit && module && units[unit].modules[module].locked) return
        if(
            unit && module && lesson && 
            (units[unit].modules[module].lessons || [])[lesson].locked
        ) return

        setExpanded({unit, module, lesson})
        navigate({unit, module, lesson})
    } 

    return <aside className="menu section is-hidden-mobile" style={{...defaultStyle, ...menuStyle}}>
        { 
            menuUnits?.map((unit, k) => <Unit 
                    unit={unit}
                    key={k}
                    styles = {styles}
                    expanded={expanded}
                    navigation={{ active, navigate:handleClick }}
                /> 
            ) 
        }
    </aside>
}
