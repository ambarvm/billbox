import { Component, OnInit } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	constructor(iconRegistry: MatIconRegistry) {}

	ngOnInit() {}
}
