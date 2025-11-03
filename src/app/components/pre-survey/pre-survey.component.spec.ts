import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSurveyComponent } from './pre-survey.component';

describe('PreSurveyComponent', () => {
  let component: PreSurveyComponent;
  let fixture: ComponentFixture<PreSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreSurveyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
