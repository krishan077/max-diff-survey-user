import { Concept } from './concept.model';
import { ProbeData } from '../components/probe-question/probe-question.component';

export interface Response {
  set_id: number;
  concepts: Concept[];
  positive_concept_id: number;
  negative_concept_id: number;
  survey: ProbeData;
  monet_id:number;
  surveyType:string;
}