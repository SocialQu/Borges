const findSynonyms = (word:string):string[] => ['']
const findAntonyms = (word:string):string[] => ['']

const findAnalogy = (analogy:[string, string], match:string):string[] => ['']
const computeBias = (opposites:[string, string], word:string):number => 0

interface iTopic { name:'', center:[number, number], embedding:number[] }
const topicClassification = (text:string, topics:iTopic[]):iTopic[] => topics
