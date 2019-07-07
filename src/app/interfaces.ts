export interface CategoryList {
	list: string[];
}

export interface Product {
	category: string;
	name: string;
	quantity: number;
}

export interface SaleData {
	category: string;
	name: string;
	price: number;
	quantity: number;
}
