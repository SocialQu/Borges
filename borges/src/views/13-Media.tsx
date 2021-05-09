import { Tabs } from "../components/molecules/Tabs"
import { Lesson } from "../components/cells/Lesson"
import { Media, Title } from '../components/atoms'

const title = 'Addditional Resources'
interface iWordEmbeddingsMedia {next():void}
export const WordEmbeddingsMedia = ({next}:iWordEmbeddingsMedia) => <Lesson title={title} next={next}>
    <Tabs tabs={['Blogs', 'Videos']}/>
</Lesson>
