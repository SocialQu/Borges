// import { Children } from 'react' // TODO: Explore using Children.
import { useMediaQuery } from 'react-responsive'
import { CSSProperties, ReactChild } from 'react'


export interface iBaseAtom {
    text?:string
    shortText?:string
    style?:CSSProperties 
    mobileStyle?:CSSProperties
    children?: ReactChild
    [x: string]: any
}

type ButtonClass = 'is-primary' | 'is-link' | 'is-info' | 'is-success' | 'is-warning' | 'is-danger'
interface iButton extends iBaseAtom { buttonClass?:ButtonClass, click():void }
const defaulButtonStyle = {}


export const CTA = ({buttonClass, text, shortText, style, mobileStyle, children, click}:iButton) => {
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })
    const defaultStyle:CSSProperties  = { fontSize:'2rem', borderRadius:20, fontWeight:900 }
    const defaultMobileStyle:CSSProperties = {...defaultStyle, fontSize:'1.25rem'}

    return <button
        onClick={click}
        className={`button ${buttonClass ? buttonClass : ''}`} 
        style={ !smallScreen
            ? {...defaultStyle, ...style}
            : {...defaultMobileStyle, ...style, ...mobileStyle}
        }

    >  
        { shortText && smallScreen ? shortText : text } 
        { children } 
    </button>
}


export const Submit = ({buttonClass, text, style, children, click}:iButton) => {
    const defaultStyle:CSSProperties  = { fontSize:'1.25rem', borderRadius:12, fontWeight:600 }

    return <button
        onClick={click}
        className={`button ${buttonClass ? buttonClass : ''}`} 
        style={{...defaultStyle, ...style}}
    > { text } { children } </button>
}

export const Button = ({buttonClass, text, style, children, click}:iButton) => {
    return <button
        onClick={click}
        className={`button ${buttonClass ? buttonClass : ''}`} 
        style={style}
    > { text } { children } </button>
}


type ButtonType = 'Button' | 'Submit' | 'CTA'
interface iButtonBox extends iButton { containerStyle?:CSSProperties, buttonType:ButtonType }
export const ButtonBox = ({buttonType, continerStyle={}, ...props}:iButtonBox) => {
    return <div style={{margin:'auto', width:'100%', ...continerStyle}}>
        { buttonType === 'Button' && <Button {...props}/>}
        { buttonType === 'Submit' && <Submit {...props}/>}
        { buttonType === 'CTA' && <CTA {...props}/>}
    </div>
}
