import { CSSProperties } from 'react'
import { Title, Submit } from '../atoms'

interface iLesson {
    title:string
    style?: CSSProperties
    titleStyle?: CSSProperties
    children?: JSX.Element | JSX.Element[]
    next():void
}

export const defaultLessonStyle:CSSProperties = {
    margin:'auto',
    maxWidth:720,
    fontSize:21,
    paddingBottom:'3em'
}

const buttonStyle:CSSProperties = {
    marginTop:'2.5em', 
    backgroundColor:'darkblue',
    paddingLeft:48,
    paddingRight:48
}

export const Lesson = ({ title, style, titleStyle, children, next }:iLesson) => <div 
    className="content" 
    style={{...defaultLessonStyle, ...style}}
>
    <Title text={title} style={{marginBottom:'2rem', color:'chocolate', ...titleStyle}}/>
    <div style={{textAlign:'left'}}> { children } </div>
    <Submit click={next} text={'Next'} buttonClass={'is-link'} style={buttonStyle}/>
</div>
