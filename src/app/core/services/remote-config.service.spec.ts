import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RemoteConfigService } from './remote-config.service';
import { environment } from 'src/environments/environment';
import { VersionInfo } from '../models/remote-config.model';

describe('RemoteConfigService', () => {
	let service: RemoteConfigService;
	let httpTestingController: HttpTestingController;

	const version: VersionInfo = {
		versionNumber: '10',
		updateOrigin: 'ADMIN_SDK_NODE',
		updateType: 'INCREMENTAL_UPDATE',
		updateUser: {
			name: 'firebase-adminsdk-rx6vt@flutter-news-app-6a808.iam.gserviceaccount.com',
			email: 'firebase-adminsdk-rx6vt@flutter-news-app-6a808.iam.gserviceaccount.com',
			imageUrl:
				'https://lh3.googleusercontent.com/a/ACg8ocLHinnrhpl3Oo1vuRO6E7GWMtcOXfPvYWjVbzOzAsC-=mo',
		},
		updateTime: 'Tue, 21 Nov 2023 15:33:45 GMT',
	};
	const expectedVersions: VersionInfo[] = [version];

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [RemoteConfigService],
			imports: [HttpClientTestingModule],
		});
		service = TestBed.inject(RemoteConfigService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		// Verifies that no requests are outstanding after each test
		httpTestingController.verify();
	});

	it('#listVersions should retrive versions successfuly', () => {
		service.listVersions().subscribe((response: VersionInfo[]) => {
			expect(response).toEqual(expectedVersions);
		});

		const req = httpTestingController.expectOne(`${environment.apiUrl}/list-versions`);
		expect(req.request.method).toEqual('GET');

		req.flush(expectedVersions);

		httpTestingController.verify();
	});

	it('#updateTemplate should retrive successfuly response', () => {
		const body = {
			name: '',
			expression: '',
			parameter: '',
			defaultValue: '',
			conditionValue: '',
		};

		service
			.updateTemplate(
				body.name,
				body.expression,
				body.parameter,
				body.defaultValue,
				body.conditionValue
			)
			.subscribe();

		const req = httpTestingController.expectOne(`${environment.apiUrl}/update-template`);
		expect(req.request.method).toEqual('PUT');

		httpTestingController.verify();
	});

	it('#downloadTemplate should retrive versions successfuly', () => {
		service.downloadTemplate().subscribe(response => {
			expect(response).toEqual(version);
		});

		const req = httpTestingController.expectOne(`${environment.apiUrl}/download-template`);
		expect(req.request.method).toEqual('GET');

		req.flush(version);

		httpTestingController.verify();
	});
});
