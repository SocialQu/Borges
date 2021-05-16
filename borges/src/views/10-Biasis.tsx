import { a11yLight as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'

import { Subtitle, Scatter } from '../components/atoms'
import { Lesson } from "../components/cells/Lesson"
import { jobsData } from '../data/bias'

const codeString = `// Arbitrary threshold to determine if there is a bias.
const biasThreshold = 2 

// Evaluate if there is a gener bias for a particular job.
const jobBiasDetection = (job:string) => {

    // Find the word embeddings of woman, man and the input.
  const woman = wordEmbeddings['woman']
  const man = wordEmbeddings['man']
  const jobEmbedding = wordEmbeddings[job]

  // Measure the distance of the job to both concepts.
  const distanceToWoman = distance(woman, jobEmbedding)
  const distanceToMan = distance(man, jobEmbedding)

  // Determine if the job is usually associated to men.
  if(distanceToMan/biasThreshold > distanceToWoman) 
  return true

  // Determine if the job is usually associated to women.
  if(distanceToWoman/biasThreshold > distanceToMan) 
  return true

  // There is no bias for the specified job and threshold.
  return false
}
`


const title = 'Application: Detecting Biasis'
interface iBiasis {next():void}
export const Biasis = ({next}:iBiasis) => <Lesson title={title} next={next}>
    <p>
        Unfortunately, we tend to make value judgments based on inaccurate or unfair attributes. 
        AI can help in automatically analyzing, measuring, and reporting these biases. 
        The word cloud below shows biases in jobs based on gender. 
        Jobs in healthcare tend to be more likely associated with women, while the opposite happens for engineering:
    </p>

    <Scatter data={jobsData} label={"Example: Job Bias by Gender"}/>

    <p>
        The process of detecting bias is simple: find the word embeddings for the two concepts you wish to compare. 
        Then, find the word embedding for the term against which to measure a potential bias. 
        Finally, compute the relative distance for each term. The greater the distance, the greater the bias.
    </p>

    <Subtitle text={"Detecting a Bias"} style={{textAlign:'center', marginTop:'2rem'}}/>
    <SyntaxHighlighter language="typescript" style={codeStyle}>
        {codeString}
    </SyntaxHighlighter>    

    <hr style={{height:3, margin: '2em auto', maxWidth: 600 }}/>

    <p>
        Because AI models incorporate the biases that we hold as a society, 
        it remains an unsolved problem, how to train word embeddings without biases. 
        
        I invite you to reflect what novel ideas do you have to train unbiased word embeddings. 
        
        As Kant said:  
    </p>

    <div>
        <Subtitle style={{fontWeight:500, maxWidth:450, margin:'2rem auto', textAlign:'center'}}>
            <i> "Truth is a predicate of whole judgments, not of partial representations." </i>
        </Subtitle>
    </div>
</Lesson>
