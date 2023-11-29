import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule, StatModule } from '../../shared';

import { FormRoutingModule } from './translations-routing.module';
import { TranslationsComponent } from './translations.component';

@NgModule({
	imports: [CommonModule, FormRoutingModule, PageHeaderModule, StatModule],
	declarations: [TranslationsComponent],
})
export class TranslationsModule {}
