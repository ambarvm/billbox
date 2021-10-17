import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {
	AngularFirestoreModule,
	AngularFirestore,
} from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from '../../environments/environment';
import { DataService } from './data.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		AngularFirestoreModule.enablePersistence(),
	],
	providers: [DataService, AngularFirestore],
})
export class CoreModule {}
