import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	user: Observable<firebase.User>;

	constructor(private auth: AngularFireAuth, private router: Router) {
		this.user = auth.user;
	}

	login(email: string, password: string) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	logout() {
		this.auth.signOut();
		this.router.navigate(['login']);
	}
}
