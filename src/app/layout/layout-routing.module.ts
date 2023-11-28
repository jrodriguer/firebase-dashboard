import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
			},
			{ path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LayoutRoutingModule {}
