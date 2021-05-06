import { Lesson } from "../components/cells/Lesson"
import { Grid } from '../components/molecules/Grid'

const title = 'References'
export const References = () => <Lesson title={title} next={() => {}}>
    <ul>
        <li> Stanford Lectures </li>
        <li> First Assignment </li>
        <li> Einsten's Book </li>
        <li> Speech Recognition </li>
        <li> NLP with Pytorch </li>
    </ul>

    <Grid items={['Cortazar', 'Pegasus Summarization']}/>
</Lesson>
