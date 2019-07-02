import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
	declarations: [],
	imports: [MatTabsModule, MatInputModule, MatButtonModule, MatIconModule, MatAutocompleteModule],
	exports: [MatTabsModule, MatInputModule, MatButtonModule, MatIconModule, MatAutocompleteModule]
})
export class MaterialModule {}
