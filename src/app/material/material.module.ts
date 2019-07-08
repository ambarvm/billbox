import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';

@NgModule({
	declarations: [],
	imports: [
		MatTabsModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatAutocompleteModule,
		MatSelectModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatTableModule
	],
	exports: [
		MatTabsModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatAutocompleteModule,
		MatSelectModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatTableModule
	]
})
export class MaterialModule {}
