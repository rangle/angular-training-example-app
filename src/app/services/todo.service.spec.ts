import { TestBed, inject, async } from '@angular/core/testing';
import { Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

// FIXME: this test should be an isolate test (no need for TestBed)

import { TodoService } from './todo.service';


describe('TodoService (isolated, no TestBed)', () => {
  let mockHttp;
  let todoService: TodoService;
  beforeEach(() => {
    mockHttp = { get: () => { } };
    spyOn(mockHttp, 'get').and.returnValue(Observable.of({
      json: () => [
        { 'done': false, 'id': 1, 'label': 'item 1' },
        { 'done': true, 'id': 2, 'label': 'item 2' }
      ]
    }));
    todoService = new TodoService(mockHttp);
  });
  it('should have the list of todos', () => {
    todoService.getTodoList();
    expect(todoService.todoList.length).toBe(2);
  });
});

describe('TodoService (using TestBed)', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService,
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: MockBackend },
      ]
    });
    const http = TestBed.get(Http);
    spyOn(http, 'get').and.callFake(url => Observable.of({
      json: () => [
        {
          'done': false,
          'id': 1,
          'label': 'item 1'
        },
        {
          'done': true,
          'id': 2,
          'label': 'item 2'
        }
      ]
    }));
    spyOn(http, 'post').and.callFake((url, body) => Observable.of({
      json: () => body
    }));
    spyOn(http, 'delete').and.callFake((url, body) => Observable.of({
      json: () => ({ label: 'old todo', done: false, id: body })
    }));
    spyOn(http, 'patch').and.callFake((url, body) => Observable.of({
      json: () => ({ label: 'toggled todo', done: body.done })
    }));
  });

  it('should have list of items from backend', async(inject([TodoService], (service: TodoService) => {
    service.getTodoList();
    expect(service.todoList.length).toEqual(2);
  })));

  it('should add an item to todo items', async(inject([TodoService], (service: TodoService) => {
    service.getTodoList();
    expect(service.todoList.length).toEqual(2);
    service.addItem('new todo');
    expect(service.todoList.length).toEqual(3);
  })));

  it('should remove an item from the todo items', async(inject([TodoService], (service: TodoService) => {
    service.getTodoList();
    expect(service.todoList.length).toEqual(2);
    service.deleteItem(1);
    expect(service.todoList.length).toEqual(1);
  })));

  it('should mark an item as complete', async(inject([TodoService], (service: TodoService) => {
    service.getTodoList();
    expect(service.todoList[0].isComplete).toEqual(false);
    service.completeItem(1);
    expect(service.todoList[0].isComplete).toEqual(true);
  })));

});

