import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/data.service';

@Component({
	selector: 'app-new-category-form',
	templateUrl: './new-category-form.component.html',
	styleUrls: ['./new-category-form.component.scss']
})
export class NewCategoryFormComponent implements OnInit {
	newCategoryForm: FormGroup;

	constructor(private fb: FormBuilder, public dataService: DataService) {
		this.newCategoryForm = fb.group({
			name: ['', Validators.required]
		});
	}

	ngOnInit() {}

	async submitHandler() {
		try {
			await this.dataService.addNewCategory(this.newCategoryForm.get('name').value);
			console.log('successfully added category');
		} catch (error) {
			console.error(error);
		}
	}
}
