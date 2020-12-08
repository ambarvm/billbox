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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

const modules = [
	MatTabsModule,
	MatInputModule,
	MatButtonModule,
	MatIconModule,
	MatAutocompleteModule,
	MatSelectModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatTableModule,
	MatPaginatorModule,
	MatSnackBarModule,
	MatSidenavModule,
	MatToolbarModule,
	MatListModule,
];

@NgModule({
	declarations: [],
	imports: modules,
	exports: modules,
})
export class MaterialModule {}
