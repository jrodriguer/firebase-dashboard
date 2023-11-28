import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
import { Subject } from 'rxjs';

// import { AuthService } from '../../auth/auth.service';
// import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceholderDirective } from '../../shared/placeholder/placeholder.directive';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
	public registerForm!: FormGroup;
	private destroyed$ = new Subject<void>();
	public provinces = [{ name: 'Madrid', code: 'M ' }];
	@ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective = {} as PlaceholderDirective;

	constructor(
		// private authService: AuthService,
		// private userService: UserService,
		private formBuilder: FormBuilder
		// private router: Router,
	) {}

	ngOnInit() {
		this._initForm();
	}

	ngOnDestroy() {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	private _initForm() {
		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			name: ['', Validators.required],
			address: this.formBuilder.group({
				street: [''],
				city: ['', [Validators.pattern('^[a-zA-Z]+$')]],
				zip: ['', [Validators.pattern(/^[0-9]{5}$/)]],
				province: [''],
			}),
		});
	}

	onSubmit() {
		// const formValue: UserDoc = this.registerForm.value;
	}
}
