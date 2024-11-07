import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNaissanceComponent } from './add-naissance.component';

describe('AddNaissanceComponent', () => {
  let component: AddNaissanceComponent;
  let fixture: ComponentFixture<AddNaissanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNaissanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNaissanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
