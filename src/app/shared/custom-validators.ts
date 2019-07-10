import { DataService } from '../core/data.service';
import { ValidatorFn, AbstractControl } from '@angular/forms';

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
}
