import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';

import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { DataService } from 'src/app/core/data.service';
import { Product } from 'src/app/interfaces';

@Component({
	selector: 'app-add-sale-form',
	templateUrl: './add-sale-form.component.html',
	styleUrls: ['./add-sale-form.component.scss']
})
export class AddSaleFormComponent implements OnInit {
	saleForm: FormGroup;
	productNames: string[] = ['Product One', 'Product Two', 'Product Three'];
	filteredNames: Product[][] = [];

	constructor(private fb: FormBuilder, public dataService: DataService) {}

	ngOnInit() {
		this.saleForm = this.fb.group({
			products: this.fb.array([])
		});
	}

	public get productForms(): FormArray {
		return this.saleForm.get('products') as FormArray;
	}

	getCategoryAt(i: number) {
		return this.productForms.at(i).get('category');
	}

	nameFilterInit(index: number) {
		combineLatest(
			this.productForms
				.at(index)
				.get('name')
				.valueChanges.pipe(startWith('')),
			this.productForms.at(index).get('category').valueChanges
		).subscribe(value => {
			this.filteredNames[index] = this._filter(value);
		});
	}

	addProduct() {
		const prod = this.fb.group({
			category: '',
			name: '',
			price: '',
			quantity: ''
		});

		this.productForms.push(prod);
		this.nameFilterInit(this.productForms.length - 1);
	}

	deleteProduct(index: number) {
		this.productForms.removeAt(index);
	}

	private _filter([name, category]): Product[] {
		const filterValue = name.toLowerCase();

		return this.dataService.products.filter(
			option =>
				option.category === category && option.name.toLowerCase().includes(filterValue)
		);
	}
}
