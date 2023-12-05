import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard.component';
import { StatModule } from 'src/app/shared';
import { NotificationComponent, TimelineComponent } from './components';

describe('DashboardComponent', () => {
	let component: DashboardComponent;
	let fixture: ComponentFixture<DashboardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, HttpClientTestingModule, NgbModule, StatModule],
			declarations: [DashboardComponent, TimelineComponent, NotificationComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DashboardComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
