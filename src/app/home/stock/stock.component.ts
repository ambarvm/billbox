import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from 'src/app/core/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces';
import { MatPaginator } from '@angular/material/paginator';

@Component({
	selector: 'app-stock',
	templateUrl: './stock.component.html',
	styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
	columnsToDisplay: string[] = ['category', 'name', 'quantity'];
	dataSource = new MatTableDataSource<Product>();
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(public dataService: DataService) {}

	ngOnInit() {
		this.dataService.productsObservable.subscribe((prods: Product[]) => {
			this.dataSource.data = prods;
		});
		this.dataSource.paginator = this.paginator;
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
