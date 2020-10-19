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
	selector: 'app-add-purchase-form',
	templateUrl: './add-purchase-form.component.html',
	styleUrls: ['./add-purchase-form.component.scss'],
})
export class AddPurchaseFormComponent implements OnInit {
	@ViewChild('form', { static: true }) form: NgForm;
	purchaseForm: FormGroup;
	filteredProducts: Product[][] = [];
	quantityLimits: number[] = [];
	filterSubscriptions: Subscription[] = [];

	constructor(
		private fb: FormBuilder,
		public dataService: DataService,
		private snackbar: MatSnackBar
	) {}

	ngOnInit() {
		this.purchaseForm = this.fb.group({
			customerName: '',
			date: [new Date(), Validators.required],
			products: this.fb.array(
				[],
				[Validators.required, CustomValidators.duplicateProductValidator]
			),
		});
	}

	public get productForms(): FormArray {
		return this.purchaseForm.get('products') as FormArray;
	}

	formgroupInit(index: number) {
		const pfi: AbstractControl = this.productForms.at(index);
		const subscription = combineLatest([
			pfi.get('name').valueChanges.pipe(startWith('')),
			pfi.get('category').valueChanges,
		]).subscribe((value) => {
			this.filteredProducts[index] = this._filter(value);
			this.quantityLimits[index] = this.getProductQuantity(
				pfi.get('category').value,
				pfi.get('name').value
			);
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
			quantity: ['', [Validators.required, Validators.min(0)]],
		});

		this.productForms.push(prod);
		this.formgroupInit(this.productForms.length - 1);
	}

	deleteProduct(index: number) {
		this.productForms.removeAt(index);
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
		await this.dataService.executePurchase(this.purchaseForm.value.products);
		console.log('purchase form submitted: ', this.purchaseForm.value);
		this.snackbar.open('Purchase added', 'Dismiss', {
			duration: 2000,
		});

		this.filterSubscriptions.map((sub) => sub.unsubscribe());
		this.productForms.clear();
		this.form.resetForm({
			customerName: '',
			date: new Date(),
			products: [],
		});
		this.filterSubscriptions = [];
	}
}
