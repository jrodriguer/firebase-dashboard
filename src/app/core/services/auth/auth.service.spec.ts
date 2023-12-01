import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { WENEA_USER_LOGIN, WENEA_USER_PROFILE } from 'src/utils/constants';
import { User } from '../../models';

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
		const credencialsObj = {
			user: 'user@email.com',
			pass: '12345',
		};
		const mockResponse = { token: 'someToken' };

		service.login(credencialsObj.user, credencialsObj.pass).subscribe({
			next: (res: { token: string }) => {
				expect(res).toBe(mockResponse);
				expect(service.token()).toBe(mockResponse.token);
				expect(service.isAuth()).toBe(true);
				expect(service.loading()).toBe(false);
				done();
			},
		});

		const request = httpTestingController.expectOne(WENEA_USER_LOGIN);
		expect(request.request.method).toBe('POST');
		expect(request.request.body).toEqual({
			email: credencialsObj.user,
			password: credencialsObj.pass,
		});

		request.flush(mockResponse);
	});

	it('#loginToken should set user token and return success reponse when getUserProfile success', (done: DoneFn) => {
		const token = 'someToken';
		const mockUser = {} as User;
		const getUserProfileSpy = spyOn(service, 'getUserProfile').and.returnValue(of(mockUser));

		service.loginToken(token).subscribe({
			next: (res: { result: boolean }) => {
				expect(res.result).toBe(true);
				expect(getUserProfileSpy).toHaveBeenCalledWith();
				done();
			},
			error: (err: Error) => {
				done.fail('Error ' + err);
			},
		});
	});

	it('#loginToken should handle error when getUserProfile fails', (done: DoneFn) => {
		const token = 'someToken';

		// Simulating an error response from getUserProfile
		// if != 400 invalid token
		// else token is valid but user has no profile
		const errorResponse = { status: 500 };
		spyOn(service, 'getUserProfile').and.returnValue(
			throwError(() => ({ status: errorResponse.status }))
		);

		service.loginToken(token).subscribe({
			next: () => {
				done.fail('Next callback should not be called');
			},
			error: (err: { status: number }) => {
				expect(err).toEqual(errorResponse);
				expect(service.getUserProfile).toHaveBeenCalled();
				done();
			},
		});
	});

	it('#getUserProfile should return user info object', (done: DoneFn) => {
		const mockResponse = {} as User;

		service.getUserProfile().subscribe(() => {
			done();
		});

		// Ensure that the HTTP request was made with the proper headers
		const req = httpTestingController.expectOne(WENEA_USER_PROFILE);
		expect(req.request.method).toEqual('GET');
		expect(req.request.headers.get('Content-Type')).toEqual('application/json');

		req.flush(mockResponse);

		// To ensure it's invoked after the asynchronous code completes.
		// httpTestingController.verify() method confirms that all expected requests have been handled.
		httpTestingController.verify();
	});

	it('#getUserProfile should handle error for status 400', (done: DoneFn) => {
		const errorResponse = { status: 400 };

		service.getUserProfile().subscribe({
			next: () => {},
			error: err => {
				expect(err.status).toEqual(errorResponse.status);
				done();
			},
		});

		const req = httpTestingController.expectOne(WENEA_USER_PROFILE);
		req.flush('', { status: 400, statusText: 'Bad request' });

		httpTestingController.verify();
	});
});
