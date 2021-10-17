import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddPurchaseFormComponent } from './add-purchase-form.component';

describe('AddPurchaseFormComponent', () => {
	let component: AddPurchaseFormComponent;
	let fixture: ComponentFixture<AddPurchaseFormComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [AddPurchaseFormComponent],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AddPurchaseFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
