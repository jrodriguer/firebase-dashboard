import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../shared';

import { FormRoutingModule } from './translations-routing.module';
import { FormComponent } from './translations.component';

@NgModule({
	imports: [CommonModule, FormRoutingModule, PageHeaderModule],
	declarations: [FormComponent],
})
export class TranslationsModule {}
