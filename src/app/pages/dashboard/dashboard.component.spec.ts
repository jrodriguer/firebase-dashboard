import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard.component';
import { environment } from '../../../environments/environment';

class MockNgbModalRef {
  componentInstance = {
    prompt: undefined,
    title: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve(true));
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let ngbModal: NgbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientTestingModule,
        NgbModule,
      ],
      declarations: [DashboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    ngbModal = TestBed.get(NgbModal);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
