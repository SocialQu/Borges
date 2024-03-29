/* eslint-disable jsx-a11y/anchor-is-valid */

import { useMediaQuery } from 'react-responsive'
import { Subtitle } from '../atoms'
import { useState } from "react"

interface iInputForm { 
    placeholder:string
    submit(value:string):void
} 

export const InputForm = ({placeholder, submit}:iInputForm) => {
    const miniScreen = useMediaQuery({ query: '(max-width: 400px)' })
    const [ value, setValue ] = useState('')

    return <div className="field has-addons" style={{width:'fit-content', margin:'auto auto 2em'}}>
        <div className="control">
            <input 
                type="text" 
                value={value}
                className="input" 
                style={{width:!miniScreen ? 300 : 200}}
                placeholder={placeholder} 
                onKeyPress={({ key }) => key === 'Enter' ? submit(value) : null}
                onChange={({target:{value}}) => setValue(value)}
            />
        </div>

        <div className="control" style={{textAlign:'center'}}>
            <a 
                className="button is-info" 
                onClick={() => submit(value)}
            > Submit </a>
        </div>
    </div>
}


interface iTextAreaForm { placeholder?:string, label?:string, submit(value:string):void }
export const TextAreaForm = ({placeholder, label, submit}:iTextAreaForm) => {
    const [value, setValue] = useState('')


    return <div style={{paddingBottom:'2em'}}>
        <div className="field">
            <Subtitle text={label} style={{textAlign:'center', marginTop:'2rem'}}/>
            <div className="control" style={{ maxWidth:640, margin:'auto' }}>
                <textarea 
                    rows={3} 
                    value={value}
                    placeholder={placeholder}
                    className="textarea" 
                    onChange={({target:{value}}) => setValue(value)}
                />
            </div>
        </div>

        <div className="control" style={{textAlign:'center'}}>
            <button 
                className="button is-link"
                onClick={() => submit(value)}
                style={{width:640, background:'chocolate', borderRadius:6, maxWidth:'100%'}}
            >Submit</button>
        </div>
    </div>
}
