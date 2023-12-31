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
			{
				path: 'translations',
				loadChildren: () =>
					import('./translations/translations.module').then(m => m.TranslationsModule),
			},
			{
				path: 'messaging',
				loadChildren: () => import('./messaging/messaging.module').then(m => m.MessagingModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LayoutRoutingModule {}
