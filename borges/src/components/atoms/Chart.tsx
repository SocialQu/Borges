import { 
    ScatterChart, 
    Scatter as RechartScatter, 
    ResponsiveContainer, 
    XAxis, 
    YAxis, 
    Tooltip, 
    CartesianGrid 
} from 'recharts'

import { Subtitle } from './'

interface iScatter { label?:string, data: {name:string, x:number, y:number}[] }
export const Scatter = ({label, data}:iScatter) => <div>
    <Subtitle text={label} style={{textAlign:'center', marginTop:'2rem'}}/>
    <ResponsiveContainer width='100%' height={200}>
        <ScatterChart
            data={data}
            style={{margin:'auto'}}
            margin={{ top:20, left:10, right:35, bottom:30 }}
        >
            <CartesianGrid />
            <YAxis type='number' dataKey='y' />
            <XAxis type='number' dataKey='x'/>

            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <RechartScatter data={data} fill='#8884d8' />
        </ScatterChart>
    </ResponsiveContainer>
</div>
