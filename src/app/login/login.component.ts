import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthService } from '../core/services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
	public credentialsForm: FormGroup;
	private destroyed$ = new Subject<void>();

	constructor(
		private router: Router,
		private authService: AuthService
	) {
		this.credentialsForm = new FormGroup({
			email: new FormControl(''),
			password: new FormControl(''),
		});
	}

	onSubmit(form: FormGroup) {
		this.authService.login(form.value.email, form.value.password).subscribe({
			next: (res: { token: string }) => {
				this.authService.loginToken(res.token).subscribe((res: { result: boolean }) => {
					this.router.navigateByUrl('/dashboard');
					console.log(res);
				});
			},
			error: err => console.error(err),
		});
	}

	ngOnDestroy() {
		this.destroyed$.next();
		this.destroyed$.complete();
	}
}
