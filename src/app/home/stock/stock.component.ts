import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';

@Component({
	selector: 'app-stock',
	templateUrl: './stock.component.html',
	styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
	columnsToDisplay: string[] = ['category', 'name', 'quantity'];
	constructor(public dataService: DataService) {}

	ngOnInit() {}
}
