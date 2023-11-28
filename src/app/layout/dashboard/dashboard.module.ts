import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { StatModule } from '../../shared';

@NgModule({
	declarations: [DashboardComponent],
	imports: [
		CommonModule,
		NgbCarouselModule,
		NgbAlertModule,
		StatModule,
		RouterModule.forChild([{ path: '', component: DashboardComponent }]),
	],
})
export class DashboardModule {}
