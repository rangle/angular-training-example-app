import { Action } from '@ngrx/store';

const defaultTask = [
  getTask('Task 1'),
  getTask('Task 2'),
  getTask('Task 3'),
];

function getTask(taskInput: string) {
  return {
    label: taskInput,
    isComplete: false
  };
}
export function todoReducer(state = [], action: Action) {
  switch (action.type) {
    case 'DEFAULT_TODO_LIST_LOADED':
      return state.concat(action.payload);
    case 'TODO_TASK_COMPLETED':
      // TODO
      return state;
    case 'TODO_TASK_DELETED':
      // TODO
      return state;
    case 'TODO_TASK_ADDED':
      const label = action.payload;
      const task = {
        label: label,
        isComplete: false
      };
      return state.concat(task);
    default:
      return state;
  }
}