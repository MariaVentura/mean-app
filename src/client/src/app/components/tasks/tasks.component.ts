import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

import { TaskService } from '../../services/task.service';
import { Task} from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TaskService]
})

export class TasksComponent implements OnInit {
  tasks: Task[];
  title: string;

  constructor(private taskService: TaskService) { 
    this.taskService.getTasks()
    .subscribe(tasks => {
      console.log(tasks);
      this.tasks = tasks;
    });
}


  ngOnInit(): void {
  }

  addTask(event:any){
    event.preventDefault();
    const newTask: Task = {
      title: this.title,
      isDone: false
    };
    this.taskService.addTask(newTask)
    .subscribe(task => {
      this.tasks.push(task);
      this.title='';
    });
  };

  deleteTask(id: any){
    const response = confirm('Are you sure to delete it?')
    if(response) {
      const tasks = this.tasks;
      this.taskService.deleteTask(id)
      .subscribe(data => {
        if(data.n == 1){
          for(let i = 0; i< tasks.length; i++){
            if(tasks[i]._id == id){
              tasks.splice(i, 1);
            }
          }
        }
      })
    }
    return;
  };

  updateTask(task: Task){
    const newTask={
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    };
    this.taskService.updateTask(newTask)
    .subscribe(res => {
      task.isDone = !task.isDone
    });
  }
}