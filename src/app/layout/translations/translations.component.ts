import { Component } from '@angular/core';
import { RemoteConfigService } from 'src/app/core';
import { RemoteVersions } from 'src/app/core/models/remote-config.model';

@Component({
	selector: 'app-translations',
	templateUrl: './translations.component.html',
	styleUrls: ['./translations.component.scss'],
})
export class TranslationsComponent {
	public listVersions: RemoteVersions[] = [];
	constructor(private translationsSrv: RemoteConfigService) {}

	public getListVersions() {
		this.translationsSrv.listVersions().subscribe(version => {
			this.listVersions.push(version);
		});
	}

	public getCurrentVersion() {
		// this.translationsSrv.currentVersion().subscribe((version) => {
		// });
	}
}
