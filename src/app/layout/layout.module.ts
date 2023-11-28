import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.componet';

@NgModule({
	imports: [CommonModule, LayoutRoutingModule, NgbDropdownModule],
	declarations: [LayoutComponent, SidebarComponent, HeaderComponent],
})
export class LayoutModule {}
