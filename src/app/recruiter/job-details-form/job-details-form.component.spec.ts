import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsFormComponent } from './job-details-form.component';

describe('JobDetailsFormComponent', () => {
  let component: JobDetailsFormComponent;
  let fixture: ComponentFixture<JobDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
