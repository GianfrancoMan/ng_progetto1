import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';

describe('AppComponent', () => {
  let dataServiceSpy = jasmine.createSpyObj<DataService>("DataService", ['setViewName'])
  let fakeDataService :DataService;
  let authServiceSpy = jasmine.createSpyObj<AuthService>("AuthService", ['checkAuth', 'isLogged']);
  let fakeAuthService :AuthService;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent, HeaderComponent
      ],
      providers:[{provide:DataService, useValue:dataServiceSpy},{provide:AuthService, useValue:authServiceSpy}],

    }).compileComponents().then(()=>{
      fakeDataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
      fakeAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    });


  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Smart City'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Smart City');
  });
});
