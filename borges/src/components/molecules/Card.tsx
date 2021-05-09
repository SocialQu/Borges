/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMediaQuery } from 'react-responsive'

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
    body:string
    img:string
}

export const MobileCard = ({title, link, body, img}: iCard) => <div className='card' style={cardStyle}>
    <CardTitle title={title} link={link} />

    <div className="card-image">
        <figure className="image is-16by9">
            <img src={img} style={{objectFit:'cover'}} alt='Card cover' />
        </figure>
    </div>

    <div className="card-content">
        <div className='content' style={{color:'whitesmoke', marginTop:'1rem'}}> 
            <p> { body } </p> 
        </div>
    </div>
</div>


export const LargeCard = ({title, link, img, body}:iCard) => <div className='card' style={cardStyle}>
    <CardTitle title={title} link={link} />

    <article className='media' style={{marginBottom:0}}>
        <figure className='media-left' style={{width:'40%', height:256}}>
            <img 
                src={img} 
                style={{objectFit:'cover', height:256}}
                alt='Card cover' 
            />
        </figure>

        <div className='media-content' style={{paddingBottom:'0.5rem', paddingRight:'1rem'}}>
            <div className='content'>
                <div className='content' style={{color:'whitesmoke', marginTop:'1rem'}}> 
                    { body } 
                </div>
            </div>
         </div>
    </article>
</div>


export const mediaQuery = '(max-width: 768px)'
export const Card = (card: iCard) => {
    const isMobile = useMediaQuery({ query:mediaQuery })

    return <div className='columns'>
        <div className='column'> 
            { !isMobile ? <LargeCard {...card}/> : <MobileCard {...card}/>} 
        </div>
    </div>
}
