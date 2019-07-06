import { DataService } from '../core/data.service';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators {
	static productValidator(dataService: DataService): ValidatorFn {
		return (control: AbstractControl): { [key: string]: boolean } | null => {
			if (
				dataService.products.some(
					({ category, name }) =>
						control.parent &&
						category === control.parent.get('category').value &&
						name === control.value
				)
			) {
				return null;
			}
			return { invalidProduct: true };
		};
	}
}
