import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/data.service';

@Component({
	selector: 'app-new-product-form',
	templateUrl: './new-product-form.component.html',
	styleUrls: ['./new-product-form.component.scss']
})
export class NewProductFormComponent implements OnInit {
	newProductForm: FormGroup;

	constructor(private fb: FormBuilder, public dataService: DataService) {}

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
		} catch (error) {
			console.error(error);
		}
	}
}
