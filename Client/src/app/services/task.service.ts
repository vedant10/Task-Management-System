import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

const baseUrl = 'http://localhost:8080/api/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(baseUrl);
  }

  create(data: any): Observable<any> {
    console.log('created task data:', data);
    return this.http.post(baseUrl, data);
  }

  delete(id: any): Observable<any> {
    console.log('id on service', id);
    return this.http.delete(`${baseUrl}/${id}`);
  }


  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
}
