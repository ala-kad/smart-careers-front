import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDowNmenuComponent } from './drop-dow-nmenu.component';

describe('DropDowNmenuComponent', () => {
  let component: DropDowNmenuComponent;
  let fixture: ComponentFixture<DropDowNmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDowNmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDowNmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
