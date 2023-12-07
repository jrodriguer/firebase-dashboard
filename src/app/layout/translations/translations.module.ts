import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule, StatModule } from '../../shared';
import { ReactiveFormsModule } from '@angular/forms';

import { FormRoutingModule } from './translations-routing.module';
import { TranslationsComponent } from './translations.component';
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
	declarations: [TranslationsComponent],
})
export class TranslationsModule {}
