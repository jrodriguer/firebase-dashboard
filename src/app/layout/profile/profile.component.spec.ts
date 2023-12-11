import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RemoteConfigService } from '../../core';
import { ProfileComponent } from './profile.component';
import { ProfileModule } from './profile.module';

describe('ProfileComponent', () => {
	let component: ProfileComponent;
	let fixture: ComponentFixture<ProfileComponent>;

	beforeEach(waitForAsync(() => {
		const spy = jasmine.createSpyObj('RemoteConfigService', [
			'listVersions',
			'downloadTemplate',
			'updateTemplate',
		]);
		TestBed.configureTestingModule({
			imports: [
				ProfileModule,
				BrowserAnimationsModule,
				RouterTestingModule,
				HttpClientTestingModule,
			],
			providers: [{ provide: RemoteConfigService, useValue: spy }],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
