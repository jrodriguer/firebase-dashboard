import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
	private destroyed$ = new Subject<void>();

	constructor(private router: Router, private authService: AuthService) {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const pw = form.value.password;
    // this.authService.signIn(email, pw).then(
    //   () => {
    //     console.log('entra');
    //     this.router.navigate(['dashboard']);
    //   },
    //   (err) => this._showErrorAlert(err)
    // );
  }

	ngOnDestroy() {
		this.destroyed$.next();
		this.destroyed$.complete();
	}
}
