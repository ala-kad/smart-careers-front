import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReviewFormComponent } from './job-review-form.component';

describe('JobReviewFormComponent', () => {
  let component: JobReviewFormComponent;
  let fixture: ComponentFixture<JobReviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobReviewFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
