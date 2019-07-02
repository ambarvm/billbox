import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSaleFormComponent } from './add-sale-form.component';

describe('AddSaleFormComponent', () => {
  let component: AddSaleFormComponent;
  let fixture: ComponentFixture<AddSaleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSaleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSaleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
