import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs';
import { map } from 'rxjs/operators';

import {Task} from '../Task';

@Injectable(
  {providedIn: 'root'}
  )
export class TaskService {
  domain: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Task[]>(`${this.domain}/api/tasks`)
    .pipe(map(res => res));
  }
  
  addTask(newTask: Task){
    return this.http.post<Task>(`${this.domain}/api/tasks`, newTask)
    .pipe(map(res => res));
  }

  deleteTask(id: any){
    return this.http.delete<Task>(`${this.domain}/api/tasks/${id}`)
    .pipe(map(res => res));
  }

  updateTask(newTask: any){
    return this.http.put(`${this.domain}/api/tasks/${newTask._id}`, newTask)
    .pipe(map(res => res));
  }
}