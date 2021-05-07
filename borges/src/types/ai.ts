import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder'
import { PCA } from 'ml-pca'

export interface iModels { model:UniversalSentenceEncoder, pca:PCA }
