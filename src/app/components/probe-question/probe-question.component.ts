import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Concept } from '../../models/concept.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface ProbeData {
  survey:any
}

@Component({
  selector: 'app-probe-question',
  templateUrl: './probe-question.component.html',
  styleUrls: ['./probe-question.component.css']
})
export class ProbeQuestionComponent implements OnInit{
  @Input() bestConcept!: Concept;
  @Input() worstConcept!: Concept;
  @Input() probeQuestions: any = [];
  @Output() onSubmit = new EventEmitter<ProbeData>();
  probeForm!: FormGroup;
  mo_id: any;


  constructor(private _fb:FormBuilder){
  }
  replaceStr(probeQues:any){
    for(let i=0;i<probeQues[0].survey.length;i++){
      if(probeQues[0].survey[i].qs_flags.type == 'most' || probeQues[0].survey[i].qs_flags.type == 'least'){
        probeQues[0].survey[i].qs_flags.type == 'most' ? probeQues[0].survey[i].question = probeQues[0].survey[i].question.replace('[MOST]', this.bestConcept.label) : probeQues[0].survey[i].question = probeQues[0].survey[i].question.replace('[LEAST]', this.worstConcept.label);
        
      }
    }
  }

  ngOnInit(): void {
    console.log(this.bestConcept , this.worstConcept)
      this.mo_id = +localStorage.getItem('mo_id');
      if(this.probeQuestions && this.probeQuestions.length > 0 && this.probeQuestions[0].survey){
          this.replaceStr(this.probeQuestions);
            this.probeForm = this._fb.group({
              single:this._fb.group({}),
              freetext:this._fb.group({})
            });
            this.probeQuestions[0].survey.forEach(q => {
          if (q.questionType === 'single') {
            const group = this.probeForm.get('single') as FormGroup;
            group.addControl(q.qs_id, new FormControl(null, Validators.required));
            group.addControl('type' , new FormControl(q.questionType))
          } else if (q.questionType === 'freetext') {
                 const group = this.probeForm.get('freetext') as FormGroup;
              group.addControl(q.qs_id, new FormControl('', [
              Validators.required,
              Validators.minLength(q.min_length || 0)
            ]));
            group.addControl('type' , new FormControl(q.questionType))
          }
          console.log(this.probeForm);
          
        });
    }
  }

  handleSubmit() {
      const probeValue = this.probeForm.value;
      console.log(probeValue);
      const result = Object.keys(probeValue).reduce((acc, key) => {
  const type = probeValue[key].type;
  const entries = Object.entries(probeValue[key]).filter(([k]) => k !== "type");

  entries.forEach(([qid, val]) => {
    acc[qid] = {
      options: val,
      type
    };
  });

  return acc;
}, {});
    console.log(result);
    const payload = {
      result
    }
      this.onSubmit.emit({
         survey:result
      });
    } 
}
