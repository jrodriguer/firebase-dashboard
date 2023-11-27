import { Component, ViewChild, OnDestroy } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
import { Subject } from 'rxjs';

// import { AlertComponent } from '../../shared/alert/alert.component';
// import { AuthService } from '../../auth/auth.service';
import { PlaceholderDirective } from '../../shared/placeholder/placeholder.directive';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private destroyed$ = new Subject<void>();
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective =
    {} as PlaceholderDirective;

  constructor() // private router: Router, // private authService: AuthService,
  {}

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
