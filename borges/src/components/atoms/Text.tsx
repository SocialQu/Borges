import { useMediaQuery } from 'react-responsive'


interface iBaseText { 
    text?:string, 
    shortText?:string, 
    style?:React.CSSProperties 
    mobileStyle?:React.CSSProperties,
    children: React.ReactNode,
    [x: string]: any
}

export const Title = ({ text, shortText, style, mobileStyle, children, ...props }: iBaseText) => {
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    const defaultStyle = { fontSize:'3rem', marginBottom:'1rem' }
    const defaultMobileStyle = { ...mobileStyle, fontSize:'2rem' }
    return <h1 
        style={ 
            style 
                ? mobileStyle && smallScreen 
                    ? mobileStyle 
                    : style 
                : smallScreen 
                    ? defaultStyle 
                    : defaultMobileStyle 
            }
        {...props}
    >  
        { !smallScreen ? text : shortText } 
        { children }
    </h1>
}


export const Subtitle = ({ text, shortText, style, mobileStyle, children, ...props }: iBaseText) => {
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    const defaultStyle = { fontSize:'1.5rem', marginBottom:'1rem' }
    const defaultMobileStyle = { ...mobileStyle, fontSize:'1.25rem' }
    return <h3
        style={ 
            style 
                ? mobileStyle && smallScreen 
                    ? mobileStyle 
                    : style 
                : smallScreen 
                    ? defaultStyle 
                    : defaultMobileStyle 
            }
        {...props}
    >  
        { !smallScreen ? text : shortText } 
        { children }
    </h3>
}


export const Paragraph = ({ text, shortText, style, mobileStyle, children, ...props }: iBaseText) => {
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    const defaultStyle = { fontSize:'1.5rem', marginBottom:'1rem' }
    const defaultMobileStyle = { ...mobileStyle, fontSize:'1.25rem' }
    return <p
        style={ 
            style 
                ? mobileStyle && smallScreen 
                    ? mobileStyle 
                    : style 
                : smallScreen 
                    ? defaultStyle 
                    : defaultMobileStyle 
            }
        {...props}
    >  
        { !smallScreen ? text : shortText } 
        { children }
    </p>
}


type Model = 'title' | 'subtitle' | 'paragraph'
interface iText extends iBaseText { model:Model }
export const Text = ({ model, ...props}: iText) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    return <>
        { model === 'title' && <Title {...props} /> }
        { model === 'subtitle' && <Subtitle {...props} /> }
        { model === 'paragraph' && <Paragraph {...props} /> }
    </>
}
