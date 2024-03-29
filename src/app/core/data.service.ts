import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { arrayUnion, increment } from 'firebase/firestore';

import { Product, SaleData } from '../interfaces';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	categoriesDoc: any;
	categoriesObservable: Observable<any>;
	categories: string[];

	productsCollection: AngularFirestoreCollection<Product>;
	productsObservable: Observable<Product[]>;
	products: Product[];

	constructor(private afs: AngularFirestore) {
		this.categoriesDoc = this.afs.doc('general/categories');
		this.categoriesObservable = this.categoriesDoc.valueChanges();
		this.categoriesObservable.subscribe((val) => (this.categories = val.list));

		this.productsCollection = afs.collection('products');
		this.productsObservable = this.productsCollection.valueChanges();
		this.productsObservable.subscribe((val) => (this.products = val));
	}

	/**
	 * Adds new product to the firestore
	 * @param product product object
	 */
	async addNewProduct(product: Product) {
		product.name = product.name.toLowerCase();
		try {
			this.productsCollection
				.doc(`${product.category}>${product.name}`)
				.set(product);
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Adds new category to the firestore
	 * @param category Name of new category
	 */
	async addNewCategory(category: string) {
		try {
			this.categoriesDoc.update({
				list: arrayUnion(category.toLowerCase()),
			});
		} catch (err) {
			throw err;
		}
	}

	async executeSale(saleDataList: SaleData[]) {
		const batch = this.afs.firestore.batch();
		saleDataList.forEach((saleData) => {
			const productRef = this.productsCollection.doc(
				`${saleData.category}>${saleData.name}`
			).ref;
			batch.update(productRef, {
				quantity: increment(-saleData.quantity),
			});
		});
		batch.commit();
	}

	async executePurchase(purchaseDataList: Product[]) {
		const batch = this.afs.firestore.batch();
		purchaseDataList.forEach((purchaseData) => {
			const productRef = this.productsCollection.doc(
				`${purchaseData.category}>${purchaseData.name}`
			).ref;
			batch.update(productRef, {
				quantity: increment(purchaseData.quantity),
			});
		});
		batch.commit();
	}

	/**
	 * Returns the product object
	 * @param category category of product
	 * @param name name of product
	 */
	public getProduct(category: string, name: string) {
		const index: number = this.products.findIndex(
			(prod: Product) => prod.category === category && prod.name === name
		);
		return index === -1 ? null : this.products[index];
	}
}
