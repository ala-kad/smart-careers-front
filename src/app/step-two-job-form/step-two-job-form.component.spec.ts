import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTwoJobFormComponent } from './step-two-job-form.component';

describe('StepTwoJobFormComponent', () => {
  let component: StepTwoJobFormComponent;
  let fixture: ComponentFixture<StepTwoJobFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepTwoJobFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepTwoJobFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
