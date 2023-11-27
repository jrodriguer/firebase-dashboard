import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

// import { environment } from '../../environments/environment';
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

		request.flush(mockResponse); // Respond to the request with the mock response
	});

	it('#loginToken should set user token and return success reponse when getUserInfo success', (done: DoneFn) => {
		const token = 'someToken';
		const mockUser = {};
		spyOn(service, 'getUserInfo').and.returnValue(of(mockUser));

		service.loginToken(token).subscribe({
			next: (res: any) => {
				// TODO: Add User info model.
				expect(res.result).toBe(true);
				done();
			},
			error: (err: Error) => {
				done.fail('Error ' + err);
			},
		});
	});

  it('', (done: DoneFn) => {

  });
});
