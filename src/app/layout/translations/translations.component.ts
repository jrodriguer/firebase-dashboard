import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RemoteConfigService } from 'src/app/core';
import { RemoteVersions, VersionInfo } from 'src/app/core/models/remote-config.model';

@Component({
	selector: 'app-translations',
	templateUrl: './translations.component.html',
	styleUrls: ['./translations.component.scss'],
})
export class TranslationsComponent {
	public listVersions: RemoteVersions[] = [];
	public updaterForm: FormGroup;

	constructor(private remoteConfigSrv: RemoteConfigService) {
		this.updaterForm = new FormGroup({
			conditionName: new FormControl(''),
			conditionExpression: new FormControl(''),
			parameter: new FormControl(''),
			defaultValue: new FormControl(''),
			conditionValue: new FormControl(''),
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

	public getListVersions(): RemoteVersions[] {
		this.remoteConfigSrv.listVersions().subscribe(version => {
			this.listVersions.push(version);
		});

		return this.listVersions;
	}

	public getCurrentTemplate() {
		this.remoteConfigSrv.currentVersion().subscribe((template: VersionInfo) => {
			const jsonData = JSON.stringify(template, null, 2);
			this.downloadFile(jsonData, 'current_template.json');
		});
	}

	public downloadFile(data: string, filename: string) {
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
