import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Form } from '@angular/forms';

@Component({
	selector: 'app-add-sale-form',
	templateUrl: './add-sale-form.component.html',
	styleUrls: ['./add-sale-form.component.scss']
})
export class AddSaleFormComponent implements OnInit {
	saleForm: FormGroup;

	constructor(private fb: FormBuilder) {}

	ngOnInit() {
		this.saleForm = this.fb.group({
			products: this.fb.array([])
		});
	}

	public get productForms(): FormArray {
		return this.saleForm.get('products') as FormArray;
	}

	addProduct() {
		const prod = this.fb.group({
			category: '',
			name: '',
			price: ''
		});

		this.productForms.push(prod);
	}

	deleteProduct(i: number) {
		this.productForms.removeAt(i);
	}
}
