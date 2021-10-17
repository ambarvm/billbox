import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewProductFormComponent } from './new-product-form.component';

describe('NewProductFormComponent', () => {
	let component: NewProductFormComponent;
	let fixture: ComponentFixture<NewProductFormComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [NewProductFormComponent],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(NewProductFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
