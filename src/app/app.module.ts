import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';

import { AddSaleFormComponent } from './home/add-sale-form/add-sale-form.component';
import { CoreModule } from './core/core.module';
import { NewProductFormComponent } from './home/new-product-form/new-product-form.component';
import { NewCategoryFormComponent } from './home/new-category-form/new-category-form.component';
import { StockComponent } from './home/stock/stock.component';
import { SharedModule } from './shared/shared.module';
import { AddPurchaseFormComponent } from './home/add-purchase-form/add-purchase-form.component';
import { LoginComponent } from './login/login.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MorePageComponent } from './home/more-page/more-page.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		AddSaleFormComponent,
		NewProductFormComponent,
		NewCategoryFormComponent,
		StockComponent,
		AddPurchaseFormComponent,
		LoginComponent,
		MorePageComponent,
	],
	imports: [
		CoreModule,
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MaterialModule,
		SharedModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
