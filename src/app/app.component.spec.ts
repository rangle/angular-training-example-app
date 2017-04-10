import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { TodoService } from './services/todo.service';
import { Store } from '@ngrx/store';


describe('AppComponent', () => {
  const fakeTodoService = {
    getDefaultTodoList: jasmine.createSpy('getDefaultTodoList')
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Store, useValue: { dispatch: () => { } } },
        { provide: TodoService, useValue: fakeTodoService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'TODO List Application!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('TODO List Application!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('TODO List Application!');
  }));

  it('should call addTask in the service', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'addTask');
    app.addTask('hello');
    expect(app.addTask).toHaveBeenCalledTimes(1);
    expect(app.addTask).toHaveBeenCalledWith('hello');
  });
});
