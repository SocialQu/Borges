import { useMediaQuery } from 'react-responsive'
import { iBaseAtom } from './Button'
// TODO: Try out Bulma Classes.

interface iBaseText extends iBaseAtom {}

export const Title = ({ text, shortText, style, mobileStyle, children, ...props }: iBaseText) => {
    const smallScreen = useMediaQuery({ query: '(max-width: 660px)' })

    const defaultStyle = { fontSize:'3rem', marginBottom:'1rem' }
    const defaultMobileStyle = { ...mobileStyle, fontSize:'2rem' }
    return <h1 
        style={ // TODO: Use useEffect
            !smallScreen
                ? {...defaultStyle, ...style}
                : {...defaultMobileStyle, ...style, ...mobileStyle}
            }
        {...props}
    >  
        { !smallScreen || !shortText ? text : shortText } 
        { children }
    </h1>
}


export const Subtitle = ({ text, shortText, style, mobileStyle, children, ...props }: iBaseText) => {
    const smallScreen = useMediaQuery({ query: '(max-width: 660px)' })

    const defaultStyle = { fontSize:'1.5rem', marginBottom:'1rem' }
    const defaultMobileStyle = { ...mobileStyle, fontSize:'1.25rem' }
    return <h3
        style={ 
            !smallScreen
                ? {...defaultStyle, ...style}
                : {...defaultMobileStyle, ...style, ...mobileStyle}
            }
        {...props}
    >  
        { !smallScreen || !shortText ? text : shortText } 
        { children }
    </h3>
}


export const Paragraph = ({ text, shortText, style, mobileStyle, children, ...props }: iBaseText) => {
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    const defaultStyle = { fontSize:'1.5rem', marginBottom:'1rem' }
    const defaultMobileStyle = { ...mobileStyle, fontSize:'1.25rem' }
    return <p
        style={
            !smallScreen
                ? {...defaultStyle, ...style}
                : {...defaultMobileStyle, ...style, ...mobileStyle}
            }
        {...props}
    >  
        { !smallScreen ? text : shortText } 
        { children }
    </p>
}


type TextType = 'title' | 'subtitle' | 'paragraph'
interface iText extends iBaseText { textType:TextType }
export const Text = ({ textType, ...props}: iText) => {
    return <>
        { textType === 'title' && <Title {...props} /> }
        { textType === 'subtitle' && <Subtitle {...props} /> }
        { textType === 'paragraph' && <Paragraph {...props} /> }
    </>
}
