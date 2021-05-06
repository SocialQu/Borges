import { Title, Button } from '../atoms'

interface iLesson {title:string, children?: JSX.Element | JSX.Element[], next():void}
export const Lesson = ({ title, children, next }:iLesson) => <div className="content">
    <Title text={title} />
    { children }
    <Button click={next} />
</div>
