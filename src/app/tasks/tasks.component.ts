import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, NewTaskComponent],
})
export class TasksComponent {
  constructor(private tasksService: TasksService) {}

  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }

  get isAddingTask() {
    return this.tasksService.isAddingTask;
  }

  onCompleteTask(id: string) {
    this.tasksService.removeTask(id);
  }

  onStartAddTask() {
    this.tasksService.startAddTask();
  }
}
