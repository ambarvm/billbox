import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard/';
import { AddSaleFormComponent } from './home/add-sale-form/add-sale-form.component';
import { AddPurchaseFormComponent } from './home/add-purchase-form/add-purchase-form.component';
import { StockComponent } from './home/stock/stock.component';
import { MorePageComponent } from './home/more-page/more-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'sale',
		component: AddSaleFormComponent,
		...canActivate(redirectUnauthorizedToLogin),
	},
	{
		path: 'purchase',
		component: AddPurchaseFormComponent,
		...canActivate(redirectUnauthorizedToLogin),
	},
	{
		path: 'stock',
		component: StockComponent,
		...canActivate(redirectUnauthorizedToLogin),
	},
	{
		path: 'more',
		component: MorePageComponent,
		...canActivate(redirectUnauthorizedToLogin),
	},
	{ path: '**', redirectTo: 'stock' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
