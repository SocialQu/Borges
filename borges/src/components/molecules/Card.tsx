/* eslint-disable jsx-a11y/anchor-is-valid */
import { CSSProperties } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Subtitle } from '../atoms'

const cardStyle = {
    backgroundColor: 'rgb(48, 48, 48)',
    borderRadius: 12,
    margin: 'auto',
    marginBottom: '1.5em',
    border: '1px solid white'
}

const headerStyle = { 
    backgroundColor: 'rgb(72, 72, 72)', 
    borderTopLeftRadius: 12, 
    borderTopRightRadius: 12 
}


interface iCardTitle { title:string, link:string }
const CardTitle = ({title, link}: iCardTitle) => <header className='card-header' style={headerStyle}>
    <a 
        target='_blank' 
        rel='noreferrer'
        href={link} 
        style={{padding:0}} 
        className='card-footer-item' 
    >
        <p className='card-header-title' style={{color:'lightskyblue', fontSize:'1.25rem'}}> 
            { title } 
        </p>
    </a>
</header>



interface iCard {
    title:string
    link:string
    children?:JSX.Element | JSX.Element[] 
    img:string
}

export const MobileCard = ({title, link, children, img}: iCard) => <div className='card' style={cardStyle}>
    <CardTitle title={title} link={link} />

    <div className="card-image">
        <figure className="image is-16by9">
            <img src={img} style={{objectFit:'cover'}} alt='Card cover' />
        </figure>
    </div>

    <div className="card-content">
        <div className='content' style={{color:'whitesmoke', marginTop:'1rem'}}> 
            { children } 
        </div>
    </div>
</div>


interface iLargeCard extends iCard { titleStyle?:CSSProperties } 
export const LargeCard = ({title, titleStyle, link, img, children}:iLargeCard) => <div>
    <a href={link}>
        <Subtitle text={title} style={{marginTop:'2rem', ...titleStyle}}/>
    </a>

    <article className='media' style={{marginBottom:0}}>
        <a href={link} style={{width:288}}>
            <img src={img} style={{objectFit:'cover'}} alt='Card cover' />
        </a>

        <div className='media-content' style={{ paddingLeft:'1rem', width:'60%'}}>
            <div className='content'> { children } </div>
        </div>
    </article>
</div>

export const mediaQuery = '(max-width: 768px)'
export const Card = (card: iLargeCard) => {
    const isMobile = useMediaQuery({ query:mediaQuery })
    return !isMobile ? <LargeCard {...card}/> : <MobileCard {...card}/>
}
