import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private auth: AuthService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: ['', Validators.email],
			password: ['', Validators.required],
		});
	}

	async submit() {
		const { email, password } = this.loginForm.value;
		try {
			const result = await this.auth.login(email, password);
			if (result.user) {
				console.log('logged in');
				this.router.navigate(['']);
			}
		} catch (error) {
			console.log(error);
		}
	}
}
