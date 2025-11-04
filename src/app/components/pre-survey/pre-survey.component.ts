import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-survey',
  templateUrl: './pre-survey.component.html',
  styleUrl: './pre-survey.component.css'
})
export class PreSurveyComponent {
type = "pre";
survey_params: any;
surveyDetails:any;
mo_id: any;
questions: any;
preSurveyFrom: FormGroup;
loader:boolean = false;


constructor(private _api: ApiService, private _fb: FormBuilder , private router: Router){
  let survey_params = localStorage.getItem('survey_params');
  this.survey_params = JSON.parse(survey_params);
  const details = localStorage.getItem('audience_data');
  this.surveyDetails = JSON.parse(details);
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
      this.preSurveyFrom = this._fb.group({
        single:this._fb.group({}),
        freetext:this._fb.group({})
      });
      this.questions.forEach(q => {
    if (q.questionType === 'single') {
      const group = this.preSurveyFrom.get('single') as FormGroup;
      group.addControl(q.qs_id, new FormControl(null, Validators.required));
      group.addControl('type' , new FormControl(q.questionType))
    } else if (q.questionType === 'freetext') {
           const group = this.preSurveyFrom.get('freetext') as FormGroup;
        group.addControl(q.qs_id, new FormControl('', [
        Validators.required,
        Validators.minLength(q.min_length || 0)
      ]));
      group.addControl('type' , new FormControl(q.questionType))
    }
    console.log(this.preSurveyFrom);
    
  });
    } else{
      this._api.show('error', res.message);
      console.error("Api error");
    }
    
  })
}

submitSurvey(){
  console.log(this.preSurveyFrom);
  if(this.preSurveyFrom.valid){
  const form = this.preSurveyFrom.value;
  const result = Object.keys(form).reduce((acc, key) => {
  const type = form[key].type;
  const entries = Object.entries(form[key]).filter(([k]) => k !== "type");
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
    console.log(res);
    this.loader = false;
    if(res && !res.error && res.status === 'success'){
      console.log(res);
      this._api.show('success', res.message);
      this.router.navigate(['/survey-instructions']);
    }else{
      this._api.show('error', res.message);
    }
  })
}
}
