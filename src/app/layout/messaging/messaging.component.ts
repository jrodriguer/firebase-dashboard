import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

	constructor(private messagingSrv: MessagingService) {
		this.messagerForm = new FormGroup({
			title: new FormControl(''),
			message: new FormControl(''),
		});
	}

	public onSubmit(form: FormGroup) {
		this.messagingSrv.sendMessage(form.value.title, form.value.message).subscribe();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
