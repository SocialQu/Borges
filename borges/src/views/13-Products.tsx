import { Lesson } from "../components/cells/Lesson"
import { Card } from '../components/molecules/Card'

const title = 'Startups'
interface iProducts {next():void}
export const Products = ({next}:iProducts) => <Lesson title={title} next={next}>
    <p>
        This is a list of products, SaaS and startups that use word embeddings to create innovative products. 

        And if you try a product, do not forget to rate it and leave an encouragement comment.

        If you would like to submit a product you created or use please use this form. 
    </p>

    <Card 
        title={'Cortazar'} 
        link={'http://cortazar.ml/'} 
        img={'cortazar.png'}
        body={'Cortazar is a text recommendation engine that serves suggestions based on smart word-embedding searches. The Netflix for readers aims to bring you a good non-fiction story to chill and enjoy after a day of hard work. Stories are ranked by match, and have ratings!'}
    />
</Lesson>
