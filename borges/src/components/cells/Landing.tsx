import { Title, Subtitle, CTA } from '../atoms'

interface iLanding {title:string, subtitle:string, children?: JSX.Element | JSX.Element[], cta():void}
export const Landing = ({ title, subtitle, children, cta }:iLanding) => <div className="content">
    <Title text={title} />
    <Subtitle text={subtitle}/>
    { children }
    <CTA click={cta} />
</div>
