import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepQuestionsComponent } from './step-questions.component';

describe('StepQuestionsComponent', () => {
  let component: StepQuestionsComponent;
  let fixture: ComponentFixture<StepQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
