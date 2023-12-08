import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { TranslationsComponent } from './translations.component';
import { TranslationsModule } from './translations.module';
import { RemoteConfigService } from '../../core';
import { VersionInfo } from '../../core/models/remote-config.model';

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
const versions: VersionInfo[] = [version];

describe('TranslationsComponent', () => {
	let component: TranslationsComponent;
	let fixture: ComponentFixture<TranslationsComponent>;
	let remoteConfigServiceSpy: jasmine.SpyObj<RemoteConfigService>;

	beforeEach(waitForAsync(() => {
		const spy = jasmine.createSpyObj('RemoteConfigService', [
			'listVersions',
			'downloadTemplate',
			'updateTemplate',
		]);
		TestBed.configureTestingModule({
			imports: [
				TranslationsModule,
				BrowserAnimationsModule,
				RouterTestingModule,
				HttpClientTestingModule,
			],
			providers: [{ provide: RemoteConfigService, useValue: spy }],
		}).compileComponents();

		remoteConfigServiceSpy = TestBed.inject(
			RemoteConfigService
		) as jasmine.SpyObj<RemoteConfigService>;
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TranslationsComponent);
		remoteConfigServiceSpy.listVersions.and.returnValue(of(versions));
		remoteConfigServiceSpy.downloadTemplate.and.returnValue(of(version));
		remoteConfigServiceSpy.updateTemplate.and.returnValue(of(''));
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should handle listVersions success', () => {
		component.getListVersions();

		expect(component.versions).toEqual(versions);
		expect(component.loading).toBeFalse();
	});

	it('should handle listVersions error', () => {
		const error = new Error('Error fetching versions');
		remoteConfigServiceSpy.listVersions.and.returnValue(throwError(() => error));

		component.getListVersions();

		expect(component.versions).toEqual([]);
	});

	it('should update template on form submission', () => {
		const formValue = {
			conditionName: 'testName',
			conditionExpression: 'testExpression',
			parameter: 'testParameter',
			defaultValue: 'testDefault',
			conditionValue: 'testValue',
		};

		const form = component.updaterForm;
		form.controls['conditionName'].setValue(formValue.conditionName);
		form.controls['conditionExpression'].setValue(formValue.conditionExpression);
		form.controls['parameter'].setValue(formValue.parameter);
		form.controls['defaultValue'].setValue(formValue.defaultValue);
		form.controls['conditionValue'].setValue(formValue.conditionValue);

		component.onSubmit(component.updaterForm);

		expect(remoteConfigServiceSpy.updateTemplate).toHaveBeenCalledWith(
			formValue.conditionName,
			formValue.conditionExpression,
			formValue.parameter,
			formValue.defaultValue,
			formValue.conditionValue
		);
	});
});
