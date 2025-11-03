import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbeQuestionComponent } from './probe-question.component';

describe('ProbeQuestionComponent', () => {
  let component: ProbeQuestionComponent;
  let fixture: ComponentFixture<ProbeQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProbeQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProbeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
