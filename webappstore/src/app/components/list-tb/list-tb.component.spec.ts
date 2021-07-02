import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTbComponent } from './list-tb.component';

describe('ListTbComponent', () => {
  let component: ListTbComponent;
  let fixture: ComponentFixture<ListTbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
