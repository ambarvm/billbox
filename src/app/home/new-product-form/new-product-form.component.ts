import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { DataService } from 'src/app/core/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-new-product-form',
	templateUrl: './new-product-form.component.html',
	styleUrls: ['./new-product-form.component.scss']
})
export class NewProductFormComponent implements OnInit {
	newProductForm: FormGroup;
	@ViewChild('form', { static: true }) form: NgForm;

	constructor(
		private fb: FormBuilder,
		public dataService: DataService,
		private snackbar: MatSnackBar
	) {}

	ngOnInit() {
		this.newProductForm = this.fb.group({
			category: ['', Validators.required],
			name: ['', Validators.required],
			quantity: ['', [Validators.required, Validators.min(0)]]
		});
	}

	async submitHandler() {
		try {
			await this.dataService.addNewProduct(this.newProductForm.value);
			console.log('successfully added prod');
			this.snackbar.open('New Product Added', 'Dismiss', {
				duration: 2000
			});
			this.form.resetForm();
		} catch (error) {
			console.error(error);
		}
	}
}
