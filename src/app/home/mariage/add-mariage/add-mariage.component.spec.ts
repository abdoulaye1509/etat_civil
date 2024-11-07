import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMariageComponent } from './add-mariage.component';

describe('AddMariageComponent', () => {
  let component: AddMariageComponent;
  let fixture: ComponentFixture<AddMariageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMariageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMariageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
