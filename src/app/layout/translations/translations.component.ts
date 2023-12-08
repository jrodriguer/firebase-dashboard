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
	public versions: Array<VersionInfo> = [];
	public updaterForm: FormGroup;
	private refreshInterval$ = interval(10000);
	private destroy$: Subject<void> = new Subject<void>();
	public loading: boolean = false;
	public currentTemplate: string = '';
	public sortOrder: number = 0;
	public sortProperty: string = '';
	public items: Array<VersionInfo> = [];

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
		this.loading = true;
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
				this.versions = versions;
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
		return this.remoteConfigSrv.listVersions().subscribe({
			next: (data: VersionInfo[]) => {
				this.versions = data;
				this.loading = false;
			},
			error: error => {
				console.error(error);
				this.versions = [];
			},
		});
	}

	onChangePage(rangePage: Array<VersionInfo>): void {
		this.versions = rangePage;
	}

	sortBy(property: keyof VersionInfo): void {
		this.sortOrder = property === this.sortProperty ? this.sortOrder * -1 : 1;
		this.sortProperty = property;
		this.items = [
			...this.items.sort((a, b) => {
				let result = 0;
				if (a[property] < b[property]) {
					result = -1;
				}
				if (a[property] > b[property]) {
					result = 1;
				}
				return result * this.sortOrder;
			}),
		];
	}

	sortIcon(property: string): string {
		if (property === this.sortProperty) {
			return this.sortOrder === 1 ? '☝️' : '👇';
		}
		return '';
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
