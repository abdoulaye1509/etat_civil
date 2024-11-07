import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDecesComponent } from './edit-deces.component';

describe('EditDecesComponent', () => {
  let component: EditDecesComponent;
  let fixture: ComponentFixture<EditDecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDecesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
