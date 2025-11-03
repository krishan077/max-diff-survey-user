import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyInstructionComponent } from './survey-instruction.component';

describe('SurveyInstructionComponent', () => {
  let component: SurveyInstructionComponent;
  let fixture: ComponentFixture<SurveyInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurveyInstructionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
