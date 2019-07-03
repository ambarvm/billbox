import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
	declarations: [],
	imports: [
		MatTabsModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatAutocompleteModule,
		MatSelectModule
	],
	exports: [
		MatTabsModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatAutocompleteModule,
		MatSelectModule
	]
})
export class MaterialModule {}
