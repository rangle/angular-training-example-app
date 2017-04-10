import { TestBed, inject } from '@angular/core/testing';
import { Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Store } from '@ngrx/store';


import { TodoService } from './todo.service';

describe('TodoService', () => {

  beforeEach(() => {
    const mockStore = {
      dispatch: () => { }
    };
    TestBed.configureTestingModule({
      providers: [
        TodoService,
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: MockBackend },
        { provide: Store, useValue: mockStore }
      ]
    });
  });

  it('FIXME should initialize with 3 items', inject([TodoService], (service: TodoService) => {

  }));

  it('FIXME should give us a observable initialized to 3 item', inject([TodoService], (service: TodoService) => {
  }));

});
