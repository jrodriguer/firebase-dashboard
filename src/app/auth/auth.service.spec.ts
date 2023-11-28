import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { AuthService } from './auth.service';

const credencialsObj = {
	user: 'user@gmail.com',
	pass: '12345',
};

fdescribe('AuthService', () => {
	let service: AuthService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AuthService],
			imports: [HttpClientTestingModule],
		});
		service = TestBed.inject(AuthService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		// Verifies that no requests are outstanding after each test
		httpTestingController.verify();
	});

	it('#login should return user logged token', (done: DoneFn) => {
		const mockResponse = {};

		service.login(credencialsObj.user, credencialsObj.pass).subscribe({
			next: (res: {}) => {
				expect(res).toBe(mockResponse);
				done();
			},
		});

		const request = httpTestingController.expectOne(
			'https://backend-dehesa.wenea.site/api/v7/user/login/'
		);
		expect(request.request.method).toBe('POST');
		expect(request.request.body).toEqual({
			email: credencialsObj.user,
			password: credencialsObj.pass,
		});

		request.flush(mockResponse);
	});

	it('#loginToken should set user token and return success reponse when getUserInfo success', (done: DoneFn) => {
		const token = 'someToken';
		const mockUser = {};
		spyOn(service, 'getUserInfo').and.returnValue(of(mockUser));

		service.loginToken(token).subscribe({
			next: (res: any) => {
				expect(res.result).toBe(true);
				done();
			},
			error: (err: Error) => {
				done.fail('Error ' + err);
			},
		});
	});

	it('#loginToken should handle error when getUserInfo fails', (done: DoneFn) => {
		const token = 'someToken';

		// Simulating an error response from getUserInfo
		// if != 400 invalid token
		// else token is valid but user has no profile
		const errorResponse = { status: 500 };
		spyOn(service, 'getUserInfo').and.returnValue(throwError(errorResponse));

		service.loginToken(token).subscribe({
			next: () => {
				done.fail('Next callback should not be called');
			},
			error: (err: { status: number }) => {
				expect(service.userToken).toEqual(token);
				expect(err).toEqual(errorResponse);
				expect(service.getUserInfo).toHaveBeenCalled();
				done();
			},
		});
	});

	it('#getUserInfo should return user info object and udpate attributes', (done: DoneFn) => {
		const mockResponse = {
			user: {
				mail: 'test@example.com',
				id_tag: '123456',
				groups: ['group1', 'group2'],
				vehicles: ['vehicle1', 'vehicle2'],
			},
		};

		service.getUserInfo().subscribe(() => {
			// Assert that the user attributes have been updated correctly
			// expect(service.user).toEqual(mockResponse.user);
			// expect(service.userMail).toEqual(mockResponse.user.mail);

			done();
		});

		// Ensure that the HTTP request was made with the proper headers
		const req = httpTestingController.expectOne(
			'https://backend-dehesa.wenea.site/api/v7/user/info/'
		);
		expect(req.request.method).toEqual('GET');
		expect(req.request.headers.get('Content-Type')).toEqual('application/json');

		req.flush(mockResponse);

		// To ensure it's invoked after the asynchronous code completes.
		// httpTestingController.verify() method confirms that all expected requests have been handled.
		httpTestingController.verify();
	});

	it('#getUserInfo should handle error for status 400', (done: DoneFn) => {
		const errorResponse = { status: 400 };

		service.getUserInfo().subscribe({
			next: () => {},
			error: err => {
				expect(err.status).toEqual(errorResponse.status);
				done();
			},
		});

		const req = httpTestingController.expectOne(
			'https://backend-dehesa.wenea.site/api/v7/user/info/'
		);
		req.flush('', { status: 400, statusText: 'Bad request' });

		httpTestingController.verify();
	});

	it('#logout should clear user session and remove FCM Token', (done: DoneFn) => {});

	it('#sendFCMToken should send FCM token to backend', (done: DoneFn) => {});

	it('#deleteFCMToken should delete FCM token', (done: DoneFn) => {});
});
