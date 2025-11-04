import { Component, OnInit } from '@angular/core';
import { Concept } from '../../models/concept.model';
import { Response } from '../../models/response.model';
import { ProbeData } from '../probe-question/probe-question.component';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-max-diff-survey',
  templateUrl: './max-diff-survey.component.html',
  styleUrl: './max-diff-survey.component.css'
})
export class MaxDiffSurveyComponent  implements OnInit{
 concepts: Concept[] = [];
  sets: Concept[][] = [];
  allData:any = [];
  probeSurveyQuestions:any = [];
  currentSetIndex = 0;
  responses: Response[] = [];
  surveyComplete = false;
  currentStage: 'maxdiff' | 'probe' = 'maxdiff';
  pendingMaxDiff: { best: Concept; worst: Concept } | null = null;
  progress = 0;
  cnt_id:string;
  md_id:string;
   mo_id: number;
   surveyFeatures:any;
   loader:boolean = false;

  constructor(private _api:ApiService , private route:Router){
  }

  ngOnInit() {
    const features = localStorage.getItem('survey_features');
    this.surveyFeatures = JSON.parse(features);
     this.mo_id = +localStorage.getItem('mo_id');
    const survey_params = localStorage.getItem('survey_params');
    const surveyData = JSON.parse(survey_params);
    if(surveyData){
      this.cnt_id = surveyData.cnt_id;
      this.md_id = surveyData.md_id;
      this.getMaxDiffSurvey();
    }
  }

  getMaxDiffSurvey(){
    this.loader = true;
    this._api.getApi(`api/get-maxdiff?cnt_id=${this.cnt_id}&md_id=${this.md_id}`).subscribe((res:any)=>{
      this.loader = false;
      if(res && !res.error){
        this._api.show('success', res.message);
        console.log(res);
        this.allData = res.response;
        console.log(this.allData);
        this.sets = res.response.sets;
        this.concepts = res.response.sets[this.currentSetIndex].concepts;
        this.probeSurveyQuestions = res.response.surveys;   
      }else{
        this._api.show('error', res.message);
      }
    });
  }

  handleMaxDiffResponse(best: Concept, worst: Concept) {
    this.pendingMaxDiff = { best, worst };
    this.currentStage = 'probe';
    this.updateProgress();
  }

  handleProbeResponse(probeData: ProbeData) {
    if (!this.pendingMaxDiff) return;

    const newResponse: Response = {
      set_id: this.allData.sets[this.currentSetIndex].id,
      concepts: this.sets[this.currentSetIndex],
      positive_concept_id: parseInt(this.pendingMaxDiff.best.id),
      negative_concept_id: parseInt(this.pendingMaxDiff.worst.id),
      survey:probeData.survey,
      monet_id:this.mo_id,
      surveyType:this.probeSurveyQuestions[0].surveytype
    };
    if(newResponse && newResponse.survey && !this.surveyComplete){
      this.storeFeedback('/api/md-storeFeedback' , newResponse);
    }

    this.responses.push(newResponse);
    console.log(this.responses);
    
    this.pendingMaxDiff = null;

    if (this.currentSetIndex < this.sets.length - 1) {
      console.log('haiga ha');
      
      this.currentSetIndex++;
      this.concepts = this.allData.sets[this.currentSetIndex].concepts;
      this.currentStage = 'maxdiff';
    } else {
      this.surveyComplete = true;
      if(this.surveyFeatures.post == 1){
        this.route.navigate(['/post-survey']);
      }else[
        this.route.navigate(['/thankyou'])
      ]
    }

    this.updateProgress();
  }

  storeFeedback(endpoint: string, payload: any){
    this.loader = true;
  this._api.postApi(endpoint , payload).subscribe((res:any)=>{
    this.loader = false;
    console.log(res);
    if(res && !res.error && res.status === 'success'){
      // console.log(res);
      this._api.show('success', res.message);
    }else{
      this._api.show('error', res.message);
    }
  })
}

  updateProgress() {
    const totalSteps = this.sets.length * 2;
    console.log(totalSteps);
    
    const currentStep = (this.currentSetIndex * 2) + (this.currentStage == 'probe' ? 1 : 0);
    console.log(this.currentSetIndex);
    
    console.log(currentStep);
    
    this.progress = this.sets.length > 0 ? (currentStep / totalSteps) * 100 : 0;
    console.log(this.progress);
    
  }

  handleRestart() {
    // this.sets = this.generateSets(this.concepts, 5);
    this.currentSetIndex = 0;
    this.responses = [];
    this.surveyComplete = false;
    this.currentStage = 'maxdiff';
    this.pendingMaxDiff = null;
    this.progress = 0;
  }
}
