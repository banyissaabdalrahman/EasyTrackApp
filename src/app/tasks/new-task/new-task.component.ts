import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;

  private tasksService = inject(TasksService);

  enteredTitle = '';
  enteredSummry = '';
  enteredDate = '';

  onCancel() {
    this.tasksService.cancelAddTask();
  }

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummry,
        dueDate: this.enteredDate,
      },
      this.userId
    );
    this.tasksService.cancelAddTask();
  }
}
