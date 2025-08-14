import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditCreatePageComponent } from './product-edit-create-page.component';

describe('ProductEditCreatePageComponent', () => {
  let component: ProductEditCreatePageComponent;
  let fixture: ComponentFixture<ProductEditCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEditCreatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEditCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
