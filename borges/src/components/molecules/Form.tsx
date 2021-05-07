import { useState } from "react"

interface iInputForm { 
    placeholder:string
    submit(value:string):void
} 

export const InputForm = ({placeholder, submit}:iInputForm) => {
    const [ value, setValue ] = useState('')

    return <div className="field has-addons">
        <div className="control">
            <input 
                type="text" 
                value={value}
                className="input" 
                placeholder={placeholder} 
                onChange={({target:{value}}) => setValue(value)}
            />
        </div>

        <div className="control">
            <a 
                className="button is-info" 
                onClick={() => submit(value)}
            > Submit </a>
        </div>
    </div>
}


interface iForm { label:string }
export const TextAreaForm = ({label}:iForm) => <> { label } </>
export const Form = ({label}:iForm) => <> { label } </>
