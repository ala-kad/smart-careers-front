import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicQuestionsStepComponent } from './dynamic-questions-step.component';

describe('DynamicQuestionsStepComponent', () => {
  let component: DynamicQuestionsStepComponent;
  let fixture: ComponentFixture<DynamicQuestionsStepComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicQuestionsStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicQuestionsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
