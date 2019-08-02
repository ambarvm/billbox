import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { DataService } from 'src/app/core/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-new-category-form',
	templateUrl: './new-category-form.component.html',
	styleUrls: ['./new-category-form.component.scss']
})
export class NewCategoryFormComponent implements OnInit {
	newCategoryForm: FormGroup;
	@ViewChild('form', { static: true }) form: NgForm;

	constructor(
		private fb: FormBuilder,
		public dataService: DataService,
		private snackbar: MatSnackBar
	) {
		this.newCategoryForm = fb.group({
			name: ['', Validators.required]
		});
	}

	ngOnInit() {}

	async submitHandler() {
		try {
			await this.dataService.addNewCategory(this.newCategoryForm.get('name').value);
			console.log('successfully added category');
			this.snackbar.open('New Category Added', 'Dismiss', {
				duration: 2000
			});
			this.form.resetForm();
		} catch (error) {
			console.error(error);
		}
	}
}
