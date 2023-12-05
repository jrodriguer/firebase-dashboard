import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule, StatModule } from '../../shared';
import { ReactiveFormsModule } from '@angular/forms';

import { FormRoutingModule } from './messaging-routing.module';
import { MessagingComponent } from './messaging.component';

@NgModule({
	imports: [CommonModule, FormRoutingModule, ReactiveFormsModule, PageHeaderModule, StatModule],
	declarations: [MessagingComponent],
})
export class MessagingModule {}
