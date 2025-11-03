import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pre-survey',
  templateUrl: './pre-survey.component.html',
  styleUrl: './pre-survey.component.css'
})
export class PreSurveyComponent {
type = "pre";
survey_params: any;
mo_id: any;
questions: any;
preSurveyFrom: FormGroup;


constructor(private _api: ApiService, private _fb: FormBuilder){
  let survey_params = localStorage.getItem('survey_params');
  this.survey_params = JSON.parse(survey_params);
  this.mo_id = +localStorage.getItem('mo_id');
  console.log(this.survey_params, this.mo_id);
  this.getSurvey(this.survey_params, this.mo_id, this.type);
}

getSurvey(survey_params, mo_id, type){
  this._api.getApi(`api/md-getSurvey?cnt_id=${survey_params.cnt_id}&mo_id=${mo_id}&surveytype=${type}`).subscribe((res: any)=>{
    console.log(res);
    if (!res.error) {
      this.questions = res.response.survey;
      this.preSurveyFrom = this._fb.group({});
      this.questions.forEach(q => {
    if (q.questionType === 'single') {
      this.preSurveyFrom.addControl(q.qs_id, new FormControl(null, Validators.required));
    } else if (q.questionType === 'freetext') {
      this.preSurveyFrom.addControl(q.qs_id, new FormControl('', [
        Validators.required,
        Validators.minLength(q.min_length || 0)
      ]));
    }
  });
    } else{
      console.error("Api error");
    }
    
  })
}

submitSurvey(){
  console.log(this.preSurveyFrom);
  
  if(this.preSurveyFrom.valid){
    console.log(this.preSurveyFrom.value);
    
  }else{
    console.error("form is not valid");
  }
}
}
