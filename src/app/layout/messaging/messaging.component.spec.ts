import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MessagingModule } from './messaging.module';
import { MessagingComponent } from './messaging.component';

describe('MessagingComponent', () => {
	let component: MessagingComponent;
	let fixture: ComponentFixture<MessagingComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [MessagingModule, BrowserAnimationsModule, RouterTestingModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MessagingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
