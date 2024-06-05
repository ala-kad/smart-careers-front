import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NzEmptyComponent } from './nz-empty.component';

describe('NzEmptyComponent', () => {
  let component: NzEmptyComponent;
  let fixture: ComponentFixture<NzEmptyComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NzEmptyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
