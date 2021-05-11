import { Title, Subtitle, CTA } from '../atoms'
import { CSSProperties } from 'react'

interface iLanding {title:string, subtitle:string, children?: JSX.Element | JSX.Element[], cta():void}
const subtitleStyle:CSSProperties = { maxWidth:660, margin:'0px auto 3rem', color:'#454545', fontSize:'2rem' }
const buttonStyle:CSSProperties = { paddingLeft:64, paddingRight:64, marginTop:'2em', backgroundColor:'midnightblue' }
export const Landing = ({ title, subtitle, children, cta }:iLanding) => <div className="content">
    <Title text={title} style={{color:'chocolate', marginBottom:'0.5rem'}} />
    <Subtitle text={subtitle} style={subtitleStyle}/>
    { children }
    <CTA click={cta} text={'Start Learning'} buttonClass={'is-link'} style={buttonStyle}/>
</div>
