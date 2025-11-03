import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxDiffSurveyComponent } from './max-diff-survey.component';

describe('MaxDiffSurveyComponent', () => {
  let component: MaxDiffSurveyComponent;
  let fixture: ComponentFixture<MaxDiffSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaxDiffSurveyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaxDiffSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
