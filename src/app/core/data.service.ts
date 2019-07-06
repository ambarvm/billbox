import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { firestore } from 'firebase/app';

import { Product, CategoryList } from '../interfaces';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	categoriesDoc: AngularFirestoreDocument<CategoryList>;
	categoriesObservable: Observable<CategoryList>;
	categories: string[];

	productsCollection: AngularFirestoreCollection<Product>;
	products: Product[];

	constructor(private afs: AngularFirestore) {
		this.categoriesDoc = this.afs.doc('general/categories');
		this.categoriesObservable = this.categoriesDoc.valueChanges();
		this.categoriesObservable.subscribe(val => (this.categories = val.list));

		this.productsCollection = afs.collection('products');
		this.productsCollection.valueChanges().subscribe(val => (this.products = val));
	}

	async addNewProduct(product: Product) {
		try {
			await this.afs
				.collection('products')
				.doc(`${product.category}-${product.name}`)
				.set(product);
		} catch (err) {
			throw err;
		}
	}

	async addNewCategory(category: string) {
		try {
			this.afs
				.collection('general')
				.doc('categories')
				.update({
					list: firestore.FieldValue.arrayUnion(category)
				});
		} catch (err) {
			throw err;
		}
	}
}
