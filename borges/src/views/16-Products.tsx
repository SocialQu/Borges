import { Lesson } from "../components/cells/Lesson"
import { Grid } from '../components/molecules/Grid'

const title = 'Startups'
export const Products = () => <Lesson title={title} next={() => {}}>
    <p>
        This is a list of products, SaaS and startups that use word embeddings to create innovative products. 

        And if you try a product, do not forget to rate it and leave an encouragement comment.

        If you would like to submit a product you created or use please use this form. 
    </p>

    <Grid items={['Cortazar', 'Pegasus Summarization']}/>
</Lesson>
