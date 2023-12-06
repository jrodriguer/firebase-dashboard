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
		this.getListVersions();
		this.setupAutoRefresh();
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
			});
	}

	public onSubmit(form: FormGroup): Subscription {
		return this.remoteConfigSrv
			.updateVersion(
				form.value.conditionName,
				form.value.conditionExpression,
				form.value.parameter,
				form.value.defaultValue,
				form.value.conditionValue
			)
			.subscribe();
	}

	public getListVersions(): void {
		this.remoteConfigSrv.listVersions().subscribe(
			(versions: VersionInfo[]) => {
				this.listVersions = versions;
			},
			error => {
				console.error(error);
			}
		);
	}

	public getCurrentTemplate(): void {
		this.remoteConfigSrv.currentVersion().subscribe((template: VersionInfo) => {
			const jsonData = JSON.stringify(template, null, 2);
			this.downloadFile(jsonData, 'current_template.json');
		});
	}

	public downloadFile(data: string, filename: string): void {
		const blob = new Blob([data], { type: 'application/json' });
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
