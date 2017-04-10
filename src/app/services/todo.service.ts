import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

@Injectable()
export class TodoService {

  constructor(private http: Http,
    private storeService: Store<any>
  ) {
  }

  getDefaultTodoList() {
    this.http.get('http://www.json-generator.com/api/json/get/bHbBeYXhnS')
      .map((data) => data.json())
      .subscribe((jsonData) => {
        const formattedTasks = jsonData.map((task) => {
          return this.getTodoTaskForDisplay(task.label, task.done);
        });
        this.storeService.dispatch({
          type: 'DEFAULT_TODO_LIST_LOADED',
          payload: formattedTasks
        });
      });
  }

  getTodoTaskForDisplay(label, isComplete) {
    return {
      label: label,
      isComplete: isComplete
    };
  }

}
