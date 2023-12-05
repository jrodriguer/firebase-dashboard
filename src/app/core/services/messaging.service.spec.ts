import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { MessagingService } from './messaging.service';

describe('MessagingService', () => {
	let service: MessagingService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [MessagingService],
			imports: [HttpClientTestingModule],
		});
		service = TestBed.inject(MessagingService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		// Verifies that no requests are outstanding after each test
		httpTestingController.verify();
	});

	it('#sendMessage should retrive successfuly response', () => {
		const messageMock = {
			title: 'Title',
			body: 'Message',
		};

		service.sendMessage(messageMock.title, messageMock.body).subscribe();

		const req = httpTestingController.expectOne(`${environment.apiUrl}/send-message`);
		expect(req.request.method).toEqual('POST');

		httpTestingController.verify();
	});
});
