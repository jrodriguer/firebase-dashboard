import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../core';

fdescribe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let service: AuthService;
	let router: Router;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule, 
				ReactiveFormsModule, 
				RouterTestingModule.withRoutes([])
			],
			declarations: [LoginComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(LoginComponent);
		service = TestBed.inject(AuthService);
		router = TestBed.inject(Router);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit form data on form submission and navigate to /dashboard', fakeAsync((done: DoneFn) => {
		spyOn(component, 'onSubmit').and.callThrough();

		const navigateSpy = spyOn(router, 'navigateByUrl').and.stub();
		const compiled = fixture.nativeElement;
		const form = compiled.querySelector('form');

		component.credentialsForm.patchValue({
			email: 'test@email.com',
			password: 'password123',
		});

		fixture.detectChanges();

		form.dispatchEvent(new Event('submit'));

		service.login(component.credentialsForm.value.email, component.credentialsForm.value.password).subscribe({
			next: () => {
				expect(navigateSpy).toHaveBeenCalledWith('/dashboard');
				done();
			},
		});

		// To simulate the passage of time within the fakeAsync() task.
		tick();

		expect(component.onSubmit).toHaveBeenCalledWith(component.credentialsForm);
	}));
});
