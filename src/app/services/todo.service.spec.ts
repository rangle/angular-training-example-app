import { TestBed, inject, async } from '@angular/core/testing';
import { Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

// FIXME: this test should be an isolate test (no need for TestBed)

import { TodoService } from './todo.service';

describe('TodoService', () => {

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
          'done': true,
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

});
