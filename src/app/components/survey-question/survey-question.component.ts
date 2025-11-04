import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Concept } from '../../models/concept.model';
interface disclamer {
  id:string,
  url:string,
  label:string
}
@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.css']
})
export class SurveyQuestionComponent implements OnInit {
  @Input() concepts: any[] = [];
  @Input() sets:any[] = [];
  @Output() onSubmit = new EventEmitter<{ best: Concept; worst: Concept }>();
  bestChoice: string | null = null;
  worstChoice: string | null = null;
  worstDisclamer:disclamer = {id:'',url:'',label:''};
  bestDisclamer:disclamer  = {id:'',url:'',label:''};

 
ngOnInit(): void {
}

  handleConceptClick(conceptId: string, type: 'best' | 'worst' , conceptIndex:number) {
    if (type === 'best') {
      if (this.bestChoice === conceptId) {
        this.bestChoice = null;
      } else {
        this.bestChoice = conceptId;
        if(conceptIndex != null && this.concepts  && this.concepts[conceptIndex].url) this.bestDisclamer = this.concepts[conceptIndex];
        console.log(this.bestDisclamer);
        if (this.worstChoice === conceptId) this.worstChoice = null;
      }
    } else {
      if (this.worstChoice === conceptId) {
        this.worstChoice = null;
      } else {
        if(conceptIndex != null && this.concepts && this.concepts[conceptIndex].url) this.worstDisclamer = this.concepts[conceptIndex];
        this.worstChoice = conceptId;
        if (this.bestChoice === conceptId) this.bestChoice = null;
      }
    }
  }

  handleSubmit() {
    if (this.bestChoice && this.worstChoice && this.bestChoice !== this.worstChoice) {
      const best = this.concepts.find(c => c.id === this.bestChoice);
      const worst = this.concepts.find(c => c.id === this.worstChoice);
      if (best && worst) {
        this.onSubmit.emit({ best, worst });
      }
    }
  }

  get isSubmitEnabled(): boolean {
    return !!(this.bestChoice && this.worstChoice && this.bestChoice !== this.worstChoice);
  }
}
