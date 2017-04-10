import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { TodoDisplayComponent } from './todo-display.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

describe('TodoDisplayComponent', () => {
  let component: TodoDisplayComponent;
  let fixture: ComponentFixture<TodoDisplayComponent>;
  let store;

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
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = fixture.debugElement.injector.get(Store);
    spyOn(store, 'dispatch').and.callFake(() => { });
    spyOn(store, 'select').and.callFake(() => { });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
