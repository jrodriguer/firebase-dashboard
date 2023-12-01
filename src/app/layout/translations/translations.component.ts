import { Component } from '@angular/core';
import { RemoteConfigService } from 'src/app/core';
import { RemoteVersions, VersionInfo } from 'src/app/core/models/remote-config.model';

@Component({
	selector: 'app-translations',
	templateUrl: './translations.component.html',
	styleUrls: ['./translations.component.scss'],
})
export class TranslationsComponent {
	public listVersions: RemoteVersions[] = [];

	constructor(private remoteConfigSrv: RemoteConfigService) {}

	public getListVersions(): RemoteVersions[]  {
		this.remoteConfigSrv.listVersions().subscribe(version => {
			this.listVersions.push(version);
		});

		return this.listVersions;
	}

	public getCurrentTemplate() {
		this.remoteConfigSrv.currentVersion().subscribe((template: VersionInfo) => {
			const jsonData = JSON.stringify(template, null, 2);
			this.downloadFile(jsonData, 'version_info.json');
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
