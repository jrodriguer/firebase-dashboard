import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

fdescribe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, HttpClientTestingModule, FormsModule],
			declarations: [LoginComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have a form', () => {
    const compiled = fixture.nativeElement;
    const formElement = compiled.querySelector('form');
    expect(formElement).toBeTruthy();
	});

	it('should have email input with binding', () => {
    const compiled = fixture.nativeElement;
    const emailInput = compiled.querySelector('input[type="email"]');
    expect(emailInput).toBeTruthy();
    // You might want to add more assertions for specific input bindings (ngModel, required, etc.)
	});

	it('should have password input with binding', () => {
    const compiled = fixture.nativeElement;
    const passwordInput = compiled.querySelector('input[type="password"]');
    expect(passwordInput).toBeTruthy();
    // Add assertions for password input bindings (ngModel, required, minlength, etc.)
	});

	it('should call submit method when form form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.nativeElement.querySelector('form');
    // Trigger form submission
    form.dispatchEvent(new Event('submit'));

		expect(component.onSubmit).toHaveBeenCalled();
	});
});
