import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Form } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
	selector: 'app-add-sale-form',
	templateUrl: './add-sale-form.component.html',
	styleUrls: ['./add-sale-form.component.scss']
})
export class AddSaleFormComponent implements OnInit {
	saleForm: FormGroup;
	names: string[] = ['Product One', 'Product Two', 'Product Three'];
	filteredNames: Observable<string[]>[] = [];

	constructor(private fb: FormBuilder) {}

	ngOnInit() {
		this.saleForm = this.fb.group({
			products: this.fb.array([])
		});
	}

	public get productForms(): FormArray {
		return this.saleForm.get('products') as FormArray;
	}

	ManageNameControl(index: number) {
		this.filteredNames[index] = this.productForms
			.at(index)
			.get('name')
			.valueChanges.pipe(
				startWith(''),
				map(value => this._filter(value))
			);
	}

	addProduct() {
		const prod = this.fb.group({
			category: '',
			name: '',
			price: ''
		});

		this.productForms.push(prod);
		this.ManageNameControl(this.productForms.length - 1);
	}

	deleteProduct(index: number) {
		this.productForms.removeAt(index);
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.names.filter(option => option.toLowerCase().includes(filterValue));
	}
}
