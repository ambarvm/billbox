import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';

import { environment } from '../environments/environment';
import { AddSaleFormComponent } from './home/add-sale-form/add-sale-form.component';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
	declarations: [AppComponent, HomeComponent, AddSaleFormComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MaterialModule,
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		AngularFirestoreModule.enablePersistence()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
