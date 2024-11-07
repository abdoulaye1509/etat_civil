import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNaissanceComponent } from './list-naissance.component';

describe('ListNaissanceComponent', () => {
  let component: ListNaissanceComponent;
  let fixture: ComponentFixture<ListNaissanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNaissanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNaissanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
