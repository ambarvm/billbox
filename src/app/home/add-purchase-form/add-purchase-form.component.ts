import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { DataService } from 'src/app/core/data.service';
import { Product } from 'src/app/interfaces';
import { CustomValidators } from 'src/app/shared/custom-validators';

@Component({
	selector: 'app-add-purchase-form',
	templateUrl: './add-purchase-form.component.html',
	styleUrls: ['./add-purchase-form.component.scss']
})
export class AddPurchaseFormComponent implements OnInit {
	purchaseForm: FormGroup;
	filteredProducts: Product[][] = [];
	quantityLimits: number[] = [];

	constructor(private fb: FormBuilder, public dataService: DataService) {}

	ngOnInit() {
		this.purchaseForm = this.fb.group({
			customerName: '',
			date: [new Date(), Validators.required],
			products: this.fb.array(
				[],
				[Validators.required, CustomValidators.duplicateProductValidator]
			)
		});
	}

	public get productForms(): FormArray {
		return this.purchaseForm.get('products') as FormArray;
	}

	formgroupInit(index: number) {
		const pfi: AbstractControl = this.productForms.at(index);
		combineLatest(
			pfi.get('name').valueChanges.pipe(startWith('')),
			pfi.get('category').valueChanges
		).subscribe(value => {
			this.filteredProducts[index] = this._filter(value);
			this.quantityLimits[index] = this.getProductQuantity(
				pfi.get('category').value,
				pfi.get('name').value
			);
		});
	}

	addProduct() {
		const prod = this.fb.group({
			category: ['', Validators.required],
			name: ['', [Validators.required, CustomValidators.productValidator(this.dataService)]],
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
		await this.dataService.executeSale(this.purchaseForm.value.products);
		console.log('sale form submitted: ', this.purchaseForm.value);
	}
}
