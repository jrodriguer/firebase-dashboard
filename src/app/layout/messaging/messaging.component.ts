import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MessagingService } from 'src/app/core/services/messaging.service';

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
		this.messagerForm = new FormGroup({
			topic: new FormControl(''),
			token: new FormControl(''),
			title: new FormControl('', [Validators.required]),
			message: new FormControl('', [Validators.required]),
		});
	}

	get controls(): { [key: string]: AbstractControl } {
		return this.messagerForm.controls;
	}

	public onSubmit(form: FormGroup) {
		this.submitted = true;

		if (this.messagerForm.invalid) {
			return;
		}

		this.messagingSrv
			.sendMessage(form.value.topic, form.value.token, form.value.title, form.value.message)
			.subscribe();

		alert('SUCCESS!! \n' + JSON.stringify(this.messagerForm.value, null, 4));
	}

	public onReset(): void {
		this.submitted = false;
		this.messagerForm.reset();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
