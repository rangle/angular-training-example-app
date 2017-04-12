import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {

  public todoList = [];

  constructor(private http: Http) {
  }

  getTodoList() {
    return this.http.get('http://localhost:3000/todos')
      .map(response => response.json())
      .map(item => item.map(todo => this.getTodoTaskForDisplay(todo.label, todo.done, todo.id)))
      .subscribe(todos => this.todoList = todos);
  }

  getTodoTaskForDisplay(label, isComplete, id) {
    return {
      id,
      label,
      isComplete
    };
  }

  addItem(taskInput: string) {
    this.http.post('http://localhost:3000/todos', { label: taskInput, done: false })
      .map(response => response.json())
      .map(todo => this.getTodoTaskForDisplay(todo.label, todo.done, todo.id))
      .subscribe(newTodo => this.todoList.push(newTodo));
  }

  deleteItem(taskId: number) {
    this.http.delete('http://localhost:3000/todos/' + taskId)
      .map(response => response.json())
      .subscribe(item => {
        this.todoList = this.todoList.filter(todo => {
          return todo.id !== taskId;
        });
      });
  }

  completeItem(taskId: number) {
    const toggledValue = !this.todoList.find(item => item.id === taskId).isComplete;
    this.http.patch('http://localhost:3000/todos/' + taskId, {
      done: toggledValue,
    })
      .map(response => response.json())
      .subscribe(item => {
        this.todoList = this.todoList.map(todo => {
          if (todo.id === taskId) {
            return Object.assign(todo, {
              isComplete: toggledValue
            });
          }
          return todo;
        });
      });
  }

}
