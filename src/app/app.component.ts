import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'rio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TODO List Application!';

  constructor(public todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodoList();
  }

}
