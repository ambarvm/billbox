import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormArray,
	Validators,
	FormControl,
	AbstractControl
} from '@angular/forms';

import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { DataService } from 'src/app/core/data.service';
import { Product } from 'src/app/interfaces';
import { CustomValidators } from 'src/app/shared/custom-validators';

@Component({
	selector: 'app-add-sale-form',
	templateUrl: './add-sale-form.component.html',
	styleUrls: ['./add-sale-form.component.scss']
})
export class AddSaleFormComponent implements OnInit {
	saleForm: FormGroup;
	filteredProducts: Product[][] = [];
	quantityLimits: number[] = [];

	constructor(private fb: FormBuilder, public dataService: DataService) {}

	ngOnInit() {
		this.saleForm = this.fb.group({
			customerName: '',
			date: [new Date(), Validators.required],
			products: this.fb.array(
				[],
				[Validators.required, CustomValidators.duplicateProductValidator]
			)
		});
	}

	public get productForms(): FormArray {
		return this.saleForm.get('products') as FormArray;
	}

	formgroupInit(index: number) {
		const pfi: AbstractControl = this.productForms.at(index);
		combineLatest(
			pfi.get('name').valueChanges.pipe(startWith('')),
			pfi.get('category').valueChanges
		).subscribe(value => {
			this.filteredProducts[index] = this._filter(value);
			const quantity = (this.quantityLimits[index] = this.getProductQuantity(
				pfi.get('category').value,
				pfi.get('name').value
			));
			pfi.get('quantity').setValidators([
				Validators.required,
				Validators.min(1),
				Validators.max(quantity)
			]);
			pfi.get('quantity').updateValueAndValidity();
		});
	}

	addProduct() {
		const prod = this.fb.group({
			category: ['', Validators.required],
			name: ['', [Validators.required, CustomValidators.productValidator(this.dataService)]],
			price: ['', [Validators.required, Validators.min(0)]],
			quantity: ['', [Validators.required, Validators.min(1)]]
		});

		this.productForms.push(prod);
		this.formgroupInit(this.productForms.length - 1);
	}

	deleteProduct(index: number) {
		this.productForms.removeAt(index);
		this.filteredProducts[index] = [];
	}

	private _filter([name, category]): Product[] {
		const filterValue = name.toLowerCase();

		return this.dataService.products.filter(
			option =>
				option.category === category && option.name.toLowerCase().includes(filterValue)
		);
	}

	getProductQuantity(category: string, name: string): number {
		const prod: Product = this.dataService.getProduct(category, name);
		return prod ? prod.quantity : 0;
	}

	async submitHandler() {
		this.dataService.executeSale(this.saleForm.value.products);
		console.log('sale form submitted: ', this.saleForm.value);
	}
}
