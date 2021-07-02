import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCategoryComponent } from './grid-category.component';

describe('GridCategoryComponent', () => {
  let component: GridCategoryComponent;
  let fixture: ComponentFixture<GridCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
