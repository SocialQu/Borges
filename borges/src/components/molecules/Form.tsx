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


interface iTextAreaForm { label:string, submit(value:string):void }
export const TextAreaForm = ({label, submit}:iTextAreaForm) => {
    const [value, setValue] = useState('')


    return <div>
        <div className="field">
            <label className="label"> {label} </label>
            <div className="control">
                <textarea 
                    rows={10} 
                    value={value}
                    className="textarea" 
                    placeholder="10 lines of textarea" 
                    onChange={({target:{value}}) => setValue(value)}
                />
            </div>
        </div>

        <div className="control">
            <button 
                className="button is-link"
                onClick={() => submit(value)}
            >Submit</button>
        </div>
    </div>
}


interface iForm { label:string }
export const Form = ({label}:iForm) => <> { label } </>
