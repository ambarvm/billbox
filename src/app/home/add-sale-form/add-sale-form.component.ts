import { Component, OnInit, ViewChild } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormArray,
	Validators,
	AbstractControl,
	NgForm,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { combineLatest, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { DataService } from 'src/app/core/data.service';
import { Product } from 'src/app/interfaces';
import { CustomValidators } from 'src/app/shared/custom-validators';

@Component({
	selector: 'app-add-sale-form',
	templateUrl: './add-sale-form.component.html',
	styleUrls: ['./add-sale-form.component.scss'],
})
export class AddSaleFormComponent implements OnInit {
	@ViewChild('form', { static: true }) form: NgForm;
	saleForm: FormGroup;
	filteredProducts: Product[][] = [];
	quantityLimits: number[] = [];
	filterSubscriptions: Subscription[] = [];

	constructor(
		private fb: FormBuilder,
		public dataService: DataService,
		private snackbar: MatSnackBar
	) {}

	ngOnInit() {
		this.saleForm = this.fb.group({
			customerName: '',
			date: [new Date(), Validators.required],
			products: this.fb.array(
				[],
				[Validators.required, CustomValidators.duplicateProductValidator]
			),
		});
	}

	public get productForms(): FormArray {
		return this.saleForm.get('products') as FormArray;
	}

	formgroupInit(index: number) {
		const pfi: AbstractControl = this.productForms.at(index);
		const quantityControl = pfi.get('quantity');
		const subscription = combineLatest([
			pfi.get('name').valueChanges.pipe(startWith('')),
			pfi.get('category').valueChanges,
		]).subscribe((value) => {
			this.filteredProducts[index] = this._filter(value);
			const quantity = (this.quantityLimits[index] = this.getProductQuantity(
				pfi.get('category').value,
				pfi.get('name').value
			));
			quantityControl.setValidators([
				Validators.required,
				Validators.min(0),
				Validators.max(quantity),
			]);
			pfi.get('quantity').updateValueAndValidity();
		});

		this.filterSubscriptions.push(subscription);
	}

	addProduct() {
		const prod = this.fb.group({
			category: ['', Validators.required],
			name: [
				'',
				[
					Validators.required,
					CustomValidators.productValidator(this.dataService),
				],
			],
			price: [0, [Validators.required, Validators.min(0)]],
			quantity: ['', [Validators.required, Validators.min(1)]],
		});

		this.productForms.push(prod);
		this.formgroupInit(this.productForms.length - 1);
	}

	deleteProduct(index: number) {
		this.productForms.removeAt(index);
		this.quantityLimits = this.quantityLimits.filter((_, i) => i !== index);
		this.filterSubscriptions[index].unsubscribe();
		this.filterSubscriptions = this.filterSubscriptions.filter(
			(_, i) => i !== index
		);
		this.filteredProducts[index] = [];
	}

	private _filter([name, category]): Product[] {
		const filterValue = name.toLowerCase();

		return this.dataService.products.filter(
			(option) =>
				option.category === category &&
				option.name.toLowerCase().includes(filterValue)
		);
	}

	getProductQuantity(category: string, name: string): number {
		const prod: Product = this.dataService.getProduct(category, name);
		return prod ? prod.quantity : 0;
	}

	async submitHandler() {
		await this.dataService.executeSale(this.saleForm.value.products);
		console.log('sale form submitted: ', this.saleForm.value);
		this.snackbar.open('Sale added', 'Dismiss', {
			duration: 2000,
		});

		// Reset the form and clear subscriptions
		this.filterSubscriptions.map((sub) => sub.unsubscribe());
		this.productForms.clear();
		this.form.resetForm({
			customerName: '',
			date: new Date(),
			products: [],
		});
		this.filteredProducts = [];
		this.quantityLimits = [];
	}
}
