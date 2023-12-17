import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-translations',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnDestroy {
	private destroy$: Subject<void> = new Subject<void>();

	constructor() {}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
