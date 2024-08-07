import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  showIdError=false;
  showDescriptionError=false;
  task: Task = {
    id: '',
    description: '',
    createdAt:new Date()
  };
  submitted = false;

  constructor(private taskService: TaskService) { }

  saveTask(): void {
    const data = {
      id: this.task.id,
      description: this.task.description,
      createdAt: new Date()
    };
    
    let isCorrect = this.validateFields();
    
    if(isCorrect) {
      this.taskService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
    }

  }

  newTask(): void {
    this.submitted = false;
    this.task = {
      id: '',
      description: '',
      createdAt: new Date()
    };
  }

  validateFields () {
    let isCorrect = true;
    if(this.task.id === '' || Number(this.task.id) < 0 || !this.isNumeric(Number(this.task.id))){
      this.showIdError = true;
      isCorrect = false;
    }
    if(this.task.description === ''){
      this.showDescriptionError = true;
      isCorrect = false;
    }
    return isCorrect;
  }

  isNumeric(value: any) {
    return /^-?\d+$/.test(value);
  }

}
