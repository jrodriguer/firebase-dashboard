import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { MessagingService } from '../../core/services/messaging.service';

@Component({
	selector: 'app-messaging',
	templateUrl: './messaging.component.html',
	styleUrls: ['./messaging.component.scss'],
})
export class MessagingComponent implements OnDestroy {
	public messagerForm: FormGroup;
	private destroy$: Subject<void> = new Subject<void>();
	public submitted: boolean = false;

	constructor(private messagingSrv: MessagingService) {
		this.messagerForm = new FormBuilder().group({
			topic: ['all_users'],
			token: [''],
			title: ['', Validators.required],
			message: ['', Validators.required],
		});
	}

	get controls(): { [key: string]: AbstractControl } {
		return this.messagerForm.controls;
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public onSubmit(): void {
		this.submitted = true;
		if (this.messagerForm.invalid) {
			return;
		}

		this.messagingSrv
			.sendMessage(
				this.controls['topic'].value,
				this.controls['token'].value,
				this.controls['title'].value,
				this.controls['message'].value
			)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => alert('SUCCESS!! \n' + JSON.stringify(this.messagerForm.value, null, 4)));
	}

	public onReset(): void {
		this.submitted = false;
		this.messagerForm.reset();
	}
}
