import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Concept } from '../../models/concept.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface ProbeData {
  bestReason: string;
  worstReason: string;
  confidence: string;
  comments:string;
}

@Component({
  selector: 'app-probe-question',
  templateUrl: './probe-question.component.html',
  styleUrls: ['./probe-question.component.css']
})
export class ProbeQuestionComponent {
  @Input() bestConcept!: Concept;
  @Input() worstConcept!: Concept;
  @Input() questionNumber = 0;
  @Output() onSubmit = new EventEmitter<ProbeData>();
  probeForm!: FormGroup;

  confidenceOptions = [
  { value: 'very-confident', label: "Very confident - I'm certain about my preferences" },
  { value: 'somewhat-confident', label: 'Somewhat confident - I have a general preference' },
  { value: 'neutral', label: 'Neutral - It was a difficult choice' },
  { value: 'not-confident', label: "Not confident - I'm unsure about my selections" }
];

  constructor(private _fb:FormBuilder){
    this.createForm();
  }
  createForm(){
    this.probeForm = this._fb.group({
      bestReason:this._fb.control('',Validators.required),
      worstReason:this._fb.control('',Validators.required),
      confidence:this._fb.control('',Validators.required),
      comments:this._fb.control('')
    })
  }
  handleSubmit() {
      const probeValue = this.probeForm.value;
      this.onSubmit.emit({
        bestReason: probeValue.bestReason.trim(),
        worstReason: probeValue.worstReason.trim(),
        confidence: probeValue.confidence,
        comments:probeValue.comments
      });
    } 
}
