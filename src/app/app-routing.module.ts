import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard/';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{
		path: '',
		component: HomeComponent,
		...canActivate(redirectUnauthorizedToLogin),
	},
	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
