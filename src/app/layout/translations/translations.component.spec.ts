import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { TranslationsComponent } from './translations.component';
import { TranslationsModule } from './translations.module';

describe('TranslationsComponent', () => {
	let component: TranslationsComponent;
	let fixture: ComponentFixture<TranslationsComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [TranslationsModule, BrowserAnimationsModule, RouterTestingModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TranslationsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
