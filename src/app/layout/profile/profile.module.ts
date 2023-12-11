import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule, StatModule } from '../../shared';
import { ReactiveFormsModule } from '@angular/forms';

import { FormRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { PaginationModule } from '../../shared/modules/paginator/pagination.module';

@NgModule({
	imports: [
		CommonModule,
		FormRoutingModule,
		ReactiveFormsModule,
		PageHeaderModule,
		StatModule,
		PaginationModule,
	],
	declarations: [ProfileComponent],
})
export class ProfileModule {}
