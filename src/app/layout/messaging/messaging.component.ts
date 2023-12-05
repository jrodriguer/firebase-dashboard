import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { RemoteConfigService } from 'src/app/core';

@Component({
	selector: 'app-messaging',
	templateUrl: './messaging.component.html',
	styleUrls: ['./messaging.component.scss'],
})
export class MessagingComponent implements OnDestroy {
	private destroy$: Subject<void> = new Subject<void>();

	constructor(private remoteConfigSrv: RemoteConfigService) {}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
