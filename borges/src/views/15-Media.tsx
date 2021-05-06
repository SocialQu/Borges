import { Tabs } from "../components/molecules/Tabs"
import { Lesson } from "../components/cells/Lesson"
import { Media, Title } from '../components/atoms'

const title = 'Addditional Resources'
export const WordEmbeddingsMedia = () => <Lesson title={'Addditional Material'} next={() => {}}>
    <Tabs tabs={['Blogs', 'Videos']}/>
</Lesson>
