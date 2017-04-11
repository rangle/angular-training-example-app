import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { TodoDisplayComponent } from './todo-display.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

describe('TodoDisplayComponent', () => {
  let component: TodoDisplayComponent;
  let fixture: ComponentFixture<TodoDisplayComponent>;
  let el;

  beforeEach(async(() => {

    const mockStore = {
      select: () => { },
      dispatch: () => { }
    };

    TestBed.configureTestingModule({
      declarations: [
        TodoDisplayComponent,
        CapitalizePipe
      ],
      providers: []
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display each todo', () => {
    component.tasksToDisplay = [
      { label: 'first', isComplete: false },
      { label: 'second', isComplete: false }
    ];
    fixture.detectChanges();
    expect(el.querySelector('ul').children.length).toBe(2);
  });

  it('should emit a delete output', () => {
    spyOn(component.onItemDeleted, 'emit');
    component.deleteTask(2);
    expect(component.onItemDeleted.emit).toHaveBeenCalled();
  });

});
