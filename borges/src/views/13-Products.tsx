import { Lesson } from "../components/cells/Lesson"
import { Card } from '../components/molecules/Card'

const title = 'Startups'
interface iProducts {next():void}
export const Products = ({next}:iProducts) => <Lesson title={title} next={next}>
    <p>
        This is a list of startups that have products based on word embeddings.

        If you would like to submit a product, please send me a message on LinkedIn.
    </p>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <Card 
        title={'Cortazar: A Reading Recommendation Engine'} 
        link={'http://cortazar.ml/'} 
        img={'cortazar.png'}
    >
        <p>
            <a href="https://cortazar.ml" target='_blank' rel='noreferrer'>
                <strong> Cortazar </strong>
            </a> serves reading suggestions based on smart word embedding searches, 
            the stories are ranked by match and rating. <br/><br/>

            Cortazar is the Netflix for book lovers!
        </p>

    </Card>

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>
</Lesson>
