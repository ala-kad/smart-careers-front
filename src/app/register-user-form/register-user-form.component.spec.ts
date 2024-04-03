import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterUserFormComponent } from './register-user-form.component';

describe('RegisterUserFormComponent', () => {
  let component: RegisterUserFormComponent;
  let fixture: ComponentFixture<RegisterUserFormComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterUserFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
