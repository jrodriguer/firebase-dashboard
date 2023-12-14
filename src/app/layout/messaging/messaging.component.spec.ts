import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MessagingService } from '../../core/services/messaging.service';
import { MessagingComponent } from './messaging.component';
import { PageHeaderComponent } from '../../shared/modules/page-header/page-header.component';

describe('MessagingComponent', () => {
	let component: MessagingComponent;
	let fixture: ComponentFixture<MessagingComponent>;
	let messagingService: jasmine.SpyObj<MessagingService>;

	beforeEach(waitForAsync(() => {
		const messagingServiceSpy = jasmine.createSpyObj('MessagingService', ['sendMessage']);

		TestBed.configureTestingModule({
			declarations: [MessagingComponent, PageHeaderComponent],
			imports: [ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule],
			providers: [{ provide: MessagingService, useValue: messagingServiceSpy }],
		}).compileComponents();

		messagingService = TestBed.inject(MessagingService) as jasmine.SpyObj<MessagingService>;
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MessagingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call sendMessage method on form submission', () => {
		const form = component.messagerForm;
		form.controls['topic'].setValue('topic');
		form.controls['token'].setValue('');
		form.controls['title'].setValue('Title');
		form.controls['message'].setValue('Message');

		messagingService.sendMessage.and.returnValue(of(''));

		component.onSubmit();

		expect(messagingService.sendMessage).toHaveBeenCalled();
	});
});
