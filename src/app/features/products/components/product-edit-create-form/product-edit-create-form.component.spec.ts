import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditCreateFormComponent } from './product-edit-create-form.component';

describe('ProductEditCreateFormComponent', () => {
  let component: ProductEditCreateFormComponent;
  let fixture: ComponentFixture<ProductEditCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductEditCreateFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEditCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
