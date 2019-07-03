import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../../environments/environment';
import { DataService } from './data.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		AngularFirestoreModule.enablePersistence()
	],
	providers: [DataService, AngularFirestore]
})
export class CoreModule {}
