import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseFormComponent } from './add-purchase-form.component';

describe('AddPurchaseFormComponent', () => {
  let component: AddPurchaseFormComponent;
  let fixture: ComponentFixture<AddPurchaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPurchaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
