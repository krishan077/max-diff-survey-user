import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyQuestionComponent } from './components/survey-question/survey-question.component';
import { ProbeQuestionComponent } from './components/probe-question/probe-question.component';
import { UiModuleModule } from "./ui-module/ui-module.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreSurveyComponent } from './components/pre-survey/pre-survey.component';
import { PostSurveyComponent } from './components/post-survey/post-survey.component';
import { MaxDiffSurveyComponent } from './components/max-diff-survey/max-diff-survey.component';
import { InstructionComponent } from './components/instruction/instruction.component';
import { SurveyInstructionComponent } from './components/survey-instruction/survey-instruction.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SurveyQuestionComponent,
    ProbeQuestionComponent,
    PreSurveyComponent,
    PostSurveyComponent,
    MaxDiffSurveyComponent,
    InstructionComponent,
    SurveyInstructionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModuleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
