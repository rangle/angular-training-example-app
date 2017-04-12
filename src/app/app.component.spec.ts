import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { TodoService } from './services/todo.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Http, useValue: {} },
        TodoService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    const todoService = TestBed.get(TodoService);
    spyOn(todoService, 'getTodoList').and.returnValue(null);
    spyOn(todoService, 'addItem').and.returnValue(null);
    spyOn(todoService, 'deleteItem').and.returnValue(null);
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

});

describe('AppComponent (isolated test)', () => {
  let app: AppComponent;
  let mockTodoService;
  beforeEach(() => {
    mockTodoService = {
      getTodoList: () => { },
      todoList: [{
        label: 'item 1',
        isComplete: false
      }, {
        label: 'item 2',
        isComplete: true
      }]
    };

    app = new AppComponent(mockTodoService);

  });

  describe('the itemCount method', () => {

    it('should return the number of todos', () => {
      expect(app.itemCount()).toEqual(2);
    });

  });
});


// describe('AppComponent (real service test)', () => {
//   let fixture: ComponentFixture<AppComponent>;
//   let comp: AppComponent;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [AppComponent],
//       providers: [TodoService]
//     });
//     const todoService: TodoService = TestBed.get(TodoService);
//     spyOn(todoService, 'getTodoList').and.callFake(() => todoService.todoList = [
//       { label: 'item 1', isComplete: false },
//       { label: 'item 2', isComplete: true }
//     ]);
//     fixture = TestBed.createComponent(AppComponent);
//     comp = fixture.componentInstance;
//   });
//   it('should have two items', () => {

//   });
// });
