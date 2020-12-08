import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	@ViewChild('snav', { static: true }) snav: MatSidenav;
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
	navLinks = ['sale', 'purchase', 'stock', 'more'];

	constructor(
		public auth: AuthService,
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher
	) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnInit() {
		if (!this.mobileQuery.matches) {
			this.snav.open();
		}
	}
}
