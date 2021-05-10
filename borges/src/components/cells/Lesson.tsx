import { CSSProperties } from 'react'
import { Title, Submit } from '../atoms'

interface iLesson {
    title:string
    style?: CSSProperties
    children?: JSX.Element | JSX.Element[]
    next():void
}

const defaultStyle:CSSProperties = {
    margin:'auto',
    maxWidth:720,
    fontSize:21
}

export const Lesson = ({ title, style, children, next }:iLesson) => <div 
    className="content" 
    style={{...defaultStyle, ...style}}
>
    <Title text={title} style={{marginBottom:'2rem'}}/>
    { children }
    <Submit click={next} text={'Next'} buttonClass={'is-link'} style={{marginTop:'2rem'}}/>
</div>
