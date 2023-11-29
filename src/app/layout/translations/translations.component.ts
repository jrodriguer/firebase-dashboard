import { Component } from '@angular/core';
import { RemoteConfigService } from 'src/app/core';

@Component({
	selector: 'app-translations',
	templateUrl: './translations.component.html',
	styleUrls: ['./translations.component.scss'],
})
export class TranslationsComponent {
	constructor(private translationsSrv: RemoteConfigService) {}

	getListVersions() {
		this.translationsSrv.listVersions().subscribe((response) => {
			console.log(response);
		});
	}
}
