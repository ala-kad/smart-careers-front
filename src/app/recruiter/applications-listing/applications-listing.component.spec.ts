import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsListingComponent } from './applications-listing.component';

describe('ApplicationsListingComponent', () => {
  let component: ApplicationsListingComponent;
  let fixture: ComponentFixture<ApplicationsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationsListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
