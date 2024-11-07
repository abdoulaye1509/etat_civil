import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNaissanceComponent } from './edit-naissance.component';

describe('EditNaissanceComponent', () => {
  let component: EditNaissanceComponent;
  let fixture: ComponentFixture<EditNaissanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNaissanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNaissanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
