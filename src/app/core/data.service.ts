import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Category } from '../interfaces';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	categoriesCollection: AngularFirestoreCollection<Category>;
	categoriesObservable: Observable<Category[]>;

	constructor(private afs: AngularFirestore) {
		this.categoriesCollection = this.afs.collection('categories');
		this.categoriesObservable = this.categoriesCollection.valueChanges();
	}
}
