import { DataService } from '../core/data.service';
import { ValidatorFn, AbstractControl, FormArray } from '@angular/forms';

export class CustomValidators {
	static productValidator(dataService: DataService): ValidatorFn {
		return (control: AbstractControl): { [key: string]: boolean } | null => {
			const prnt: AbstractControl = control.parent;
			if (
				dataService.products.some(
					({ category, name }) =>
						prnt && category === prnt.get('category').value && name === control.value
				)
			) {
				return null;
			}
			return { invalidProduct: true };
		};
	}

	static duplicateProductValidator(formArray: FormArray): { [key: string]: boolean } | null {
		let valuesSoFar = Object.create(null);
		for (let i = 0; i < formArray.length; i++) {
			const element = formArray.at(i);
			const productId = `${element.get('category').value}-${element.get('name').value}`;
			if (productId in valuesSoFar) {
				return { duplicateProduct: true };
			}
			valuesSoFar[productId] = true;
		}
		return null;
	}
}
