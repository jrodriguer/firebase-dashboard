import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

// import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

const credencialsObj = {
  user: 'user@gmail.com',
  pass: '12345',
};

const authServiceStub = {
  get() {
    of();
  },
};

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientTestingModule],
      providers: [{ provide: AuthService, userValue: authServiceStub }],
    });
    service = TestBed.inject(AuthService);
  });

  it('#login should return user logged object', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of({}));
    service.login(credencialsObj.user, credencialsObj.pass).subscribe({
      next: (res: {}) => {
        expect(res).withContext('expected heroes').toEqual({});
        done();
      },
      error: done.fail,
    });
  });
});
