import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { ModalDialogModule } from '../../components/modal-dialog/modal-dialog.module';

@NgModule({
	declarations: [DashboardComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([{ path: '', component: DashboardComponent }]),
		ModalDialogModule,
	],
})
export class DashboardModule {}
