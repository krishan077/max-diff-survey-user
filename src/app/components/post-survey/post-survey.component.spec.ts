import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSurveyComponent } from './post-survey.component';

describe('PostSurveyComponent', () => {
  let component: PostSurveyComponent;
  let fixture: ComponentFixture<PostSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostSurveyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
