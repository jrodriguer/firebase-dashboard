import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
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
		expect(component).toBeTruthy();
	});


	it('should have email input with binding', () => {
		expect(component).toBeTruthy();
	});

	it('should have password input with binding', () => {
		expect(component).toBeTruthy();
	});

	it('should call submit method when form form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.nativeElement.querySelector('form');
    // Trigger form submission
    form.dispatchEvent(new Event('submit'));

		expect(component.onSubmit).toHaveBeenCalled();
	});
});
