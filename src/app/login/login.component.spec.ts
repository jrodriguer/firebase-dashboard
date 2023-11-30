import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, ReactiveFormsModule],
			declarations: [LoginComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit form data on form submission', fakeAsync(() => {
    spyOn(component, 'onSubmit').and.callThrough();

    const compiled = fixture.nativeElement;
    const form = compiled.querySelector('form');

    component.credentialsForm.patchValue({
      email: 'test@email.com',
      password: 'password123'
    });

    fixture.detectChanges();

    form.dispatchEvent(new Event('submit'));

		// To simulate the passage of time within the fakeAsync() task.
    tick();

    expect(component.onSubmit).toHaveBeenCalledWith(component.credentialsForm);
  }));
});
