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


interface iScatterTooltip { active?:boolean, payload?:any[], label?:string}
const ScatterTooltip = ({ active, payload, label }:iScatterTooltip) => {
    if (active && payload && payload.length) {

        return (
            <div style={{background:'white', padding:6}}>
                <p >
                    {`${payload[0].payload.name}`}<br/>
                    {`x: ${Math.round(payload[0].payload.x*100)/100}`}<br/>
                    {`y: ${Math.round(payload[0].payload.y*100)/100}`
                }</p>
            </div>
        )
    }
  
    return null
}


const colors = ['#8884d8', '#82ca9d']
interface iScatter { label?:string, data: {name:string, x:number, y:number}[][] }
export const Scatter = ({label, data}:iScatter) => <div>
    <Subtitle text={label} style={{textAlign:'center', marginTop:'2rem'}}/>
    <ResponsiveContainer width='100%' height={360}>
        <ScatterChart
            data={data}
            style={{margin:'auto'}}
            margin={{ top:20, left:10, right:35, bottom:30 }}
        >
            <CartesianGrid />
            <YAxis type='number' dataKey='y' tickFormatter={(x) => `${Math.round(x*100)/100}`} tickCount={4}/>
            <XAxis type='number' dataKey='x' tickFormatter={(x) => `${Math.round(x*100)/100}`} tickCount={5} domain={['minData', 'maxData']}/>

            <Tooltip content={<ScatterTooltip />} />
            { data.map((d, i) => <RechartScatter data={d} fill={colors[i]} />)}           
        </ScatterChart>
    </ResponsiveContainer>
</div>
