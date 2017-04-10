import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'rio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TODO List Application!';

  constructor(private storeService: Store<any>,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.todoService.getDefaultTodoList();
  }

  addTask(taskInput: string) {
    this.storeService.dispatch({
      type: 'TODO_TASK_ADDED',
      payload: taskInput
    });
  }

}
