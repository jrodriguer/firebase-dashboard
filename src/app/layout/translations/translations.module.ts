import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule, StatModule } from '../../shared';

import { FormRoutingModule } from './translations-routing.module';
import { TranslationsComponent } from './translations.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [CommonModule, FormRoutingModule, ReactiveFormsModule, PageHeaderModule, StatModule],
	declarations: [TranslationsComponent],
})
export class TranslationsModule {}
