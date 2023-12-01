import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
	{
		path: 'login',
		loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
	},
	{
		path: '',
		loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
	},
	{
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./layout/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      )
  }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {})],
	exports: [RouterModule],
})
export class AppRoutingModule {}
