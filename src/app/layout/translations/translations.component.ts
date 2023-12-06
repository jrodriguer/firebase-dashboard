import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, Subscription, interval, switchMap, takeUntil } from 'rxjs';
import { RemoteConfigService } from 'src/app/core';
import { VersionInfo } from 'src/app/core/models/remote-config.model';

@Component({
	selector: 'app-translations',
	templateUrl: './translations.component.html',
	styleUrls: ['./translations.component.scss'],
})
export class TranslationsComponent implements OnInit, OnDestroy {
	public listVersions: VersionInfo[] = [];
	public updaterForm: FormGroup;
	private refreshInterval$ = interval(10000);
	private destroy$: Subject<void> = new Subject<void>();
	public currentTemplate: string = '';

	constructor(private remoteConfigSrv: RemoteConfigService) {
		this.updaterForm = new FormGroup({
			conditionName: new FormControl(''),
			conditionExpression: new FormControl(''),
			parameter: new FormControl(''),
			defaultValue: new FormControl(''),
			conditionValue: new FormControl(''),
		});
	}

	ngOnInit(): void {
		console.log('ngOnInit');
		this.getListVersions();
		this.setupAutoRefresh();
		this.getCurrentTemplate();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private setupAutoRefresh(): void {
		this.refreshInterval$
			.pipe(
				switchMap(() => this.remoteConfigSrv.listVersions()),
				takeUntil(this.destroy$)
			)
			.subscribe((versions: VersionInfo[]) => {
				this.listVersions = versions;
				this.getCurrentTemplate();
			});
	}

	public onSubmit(form: FormGroup): Subscription {
		return this.remoteConfigSrv
			.updateTemplate(
				form.value.conditionName,
				form.value.conditionExpression,
				form.value.parameter,
				form.value.defaultValue,
				form.value.conditionValue
			)
			.subscribe();
	}

	public getListVersions(): Subscription {
		console.log('entra');
		return this.remoteConfigSrv.listVersions().subscribe({
			next: (versions: VersionInfo[]) => {
				this.listVersions = versions;
			},
			error: error => {
				console.error(error);
				this.listVersions = [];
			},
		});
	}

	public getCurrentTemplate(): void {
		this.remoteConfigSrv.downloadTemplate().subscribe((template: VersionInfo) => {
			this.currentTemplate = JSON.stringify(template, null, 2);
		});
	}

	public downloadFile(): void {
		const filename = 'current_template.json';
		const blob = new Blob([this.currentTemplate], { type: 'application/json' });
		const url = window.URL.createObjectURL(blob);

		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = filename;

		document.body.appendChild(anchor);
		anchor.click();

		document.body.removeChild(anchor);
		window.URL.revokeObjectURL(url);
	}
}
