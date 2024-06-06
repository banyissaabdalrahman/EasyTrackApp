import { Injectable } from '@angular/core';
import { DUMMY_TASKS } from '../dummy_data/dummyTasks';
import { NewTaskData } from '../_models/newTaskData.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = DUMMY_TASKS;
  private toggleAddNewTask = false;

  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) this.tasks = JSON.parse(tasks);
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string) {
    const newTask = {
      id: `t${this.tasks.length + 1}`,
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.dueDate,
    };

    this.tasks = [newTask, ...this.tasks];
    this.saveTasks();
  }

  removeTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
  }

  startAddTask() {
    this.toggleAddNewTask = true;
  }

  cancelAddTask() {
    this.toggleAddNewTask = false;
  }

  get isAddingTask() {
    return this.toggleAddNewTask;
  }
}
