import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
	{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
    // canActivate: [AuthGuard]
  },
	{
		path: 'login',
		loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
	},
	{
		path: 'register',
		loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
