import { Concept } from './concept.model';
import { ProbeData } from '../components/probe-question/probe-question.component';

export interface Response {
  setIndex: number;
  concepts: Concept[];
  best: Concept;
  worst: Concept;
  probeData: ProbeData;
}
