import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreSurveyComponent } from './components/pre-survey/pre-survey.component';
import { PostSurveyComponent } from './components/post-survey/post-survey.component';
import { InstructionComponent } from './components/instruction/instruction.component';
import { SurveyInstructionComponent } from './components/survey-instruction/survey-instruction.component';
import { MaxDiffSurveyComponent } from './components/max-diff-survey/max-diff-survey.component';

const routes: Routes = [
  {
    path: '',
    component: InstructionComponent
  },
  {
    path: 'pre-survey',
    component: PreSurveyComponent
  },
    {
    path: 'survey-instructions',
    component: SurveyInstructionComponent
  },
  {
    path: 'survey',
    component: MaxDiffSurveyComponent
  },
  {
    path: 'post-survey',
    component: PostSurveyComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
