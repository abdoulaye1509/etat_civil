import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMariageComponent } from './edit-mariage.component';

describe('EditMariageComponent', () => {
  let component: EditMariageComponent;
  let fixture: ComponentFixture<EditMariageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMariageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMariageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
