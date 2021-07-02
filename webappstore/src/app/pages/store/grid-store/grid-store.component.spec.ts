import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridStoreComponent } from './grid-store.component';

describe('GridStoreComponent', () => {
  let component: GridStoreComponent;
  let fixture: ComponentFixture<GridStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
