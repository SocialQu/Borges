import { Title, Subtitle, CTA } from '../atoms'
import { CSSProperties } from 'react'

interface iLanding {title:string, subtitle:string, children?: JSX.Element | JSX.Element[], cta():void}
const subtitleStyle:CSSProperties = { maxWidth:640, margin:'0px auto 3rem' }
const buttonStyle:CSSProperties = { paddingLeft:64, paddingRight:64, marginTop: '2.5rem' }
export const Landing = ({ title, subtitle, children, cta }:iLanding) => <div className="content">
    <Title text={title} />
    <Subtitle text={subtitle} style={subtitleStyle}/>
    { children }
    <CTA click={cta} text={'Start Learning'} buttonClass={'is-link'} style={buttonStyle}/>
</div>
