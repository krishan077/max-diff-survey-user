import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-survey',
  templateUrl: './post-survey.component.html',
  styleUrl: './post-survey.component.css'
})
export class PostSurveyComponent {
type = "post";
survey_params: any;
mo_id: any;
questions: any;
postSurveyForm: FormGroup;
loader:boolean = false;


constructor(private _api: ApiService, private _fb: FormBuilder , private router: Router){
  let survey_params = localStorage.getItem('survey_params');
  this.survey_params = JSON.parse(survey_params);
  this.mo_id = +localStorage.getItem('mo_id');
  console.log(this.survey_params, this.mo_id);
  this.getSurvey(this.survey_params, this.mo_id, this.type);
}

getSurvey(survey_params, mo_id, type){
  this.loader = true;
  this._api.getApi(`api/md-getSurvey?cnt_id=${survey_params.cnt_id}&mo_id=${mo_id}&surveytype=${type}`).subscribe((res: any)=>{
    this.loader = false;
    console.log(res);
    if (!res.error) {
      this._api.show('success', res.message);
      this.questions = res.response.survey;
      this.postSurveyForm = this._fb.group({
        single:this._fb.group({}),
        freetext:this._fb.group({}),
        multiple:this._fb.group({})
      });
      this.questions.forEach(q => {
    if (q.questionType === 'single') {
      const group = this.postSurveyForm.get('single') as FormGroup;
      group.addControl(q.qs_id, new FormControl(null, Validators.required));
      group.addControl('type' , new FormControl(q.questionType))
    } else if (q.questionType === 'multiple') {
  const group = this.postSurveyForm.get('multiple') as FormGroup;

    group.addControl(
      q.qs_id,
      new FormArray([], Validators.required)
    );
    group.addControl('type', new FormControl(q.questionType));
    }
    else if (q.questionType === 'freetext') {
           const group = this.postSurveyForm.get('freetext') as FormGroup;
        group.addControl(q.qs_id, new FormControl('', [
        Validators.required,
        Validators.minLength(q.min_length || 0)
      ]));
      group.addControl('type' , new FormControl(q.questionType))
    }
    console.log(this.postSurveyForm);
    
  });
    } else{
      this._api.show('error', res.message);
      console.error("Api error");
    }
    
  })
}
onCheckChange(event: any, qs_id: string) {
  const formArray = this.postSurveyForm.get(`multiple.${qs_id}`) as FormArray;

  if (event.target.checked) {
    formArray.push(new FormControl(event.target.value));
  } else {
    const idx = formArray.controls.findIndex(c => c.value === event.target.value);
    formArray.removeAt(idx);
  }
}


submitSurvey(){
  console.log(this.postSurveyForm);
  if(this.postSurveyForm.valid){
const form = this.postSurveyForm.value;
const result = Object.keys(form).reduce((acc, key) => {
  const type = form[key].type;
  const entries = Object.entries(form[key]).filter(([k]) => k !== "type");
  if(type === 'freetext' || type === 'single'){
    entries.forEach(([qid, val]) => {
    acc[qid] = {
      options: val,
      type
    };
  });
  }else if(type === 'multiple'){
    entries.forEach(([qid, val]) => {
    acc[qid] = {
      selectedOptions: val,
      type
    };
  });
  }

  return acc;
}, {});
console.log(result);
    const payload = {
      set_id:null,
      negative_concept_id:null,
      positive_concept_id:null,
      monet_id:this.mo_id,
      survey:result,
      surveyType:this.type
    }
    this.storeFeedback('/api/md-storeFeedback' , payload);
  }else{
    console.error("form is not valid");
  }
}

storeFeedback(endpoint: string, payload: any){
  this.loader = true;
  this._api.postApi(endpoint , payload).subscribe((res:any)=>{
    this.loader = false;
    console.log(res);
    if(res && !res.error && res.status === 'success'){
      console.log(res);
      this._api.show('success', res.message);
      this.router.navigate(['/thankyou']);
    }else{
      this._api.show('error', res.message);
    }
  })
}
}


