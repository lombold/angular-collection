import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../domain/employee";
import {API_V1_EMPLOYEES} from "../config/api-routes.const";
import {CRUDServiceInterface} from "../interfaces/crudservice.interface";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements CRUDServiceInterface<Employee>{

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_V1_EMPLOYEES.READ_ALL);
  }

  public get(id: string): Observable<Employee>{
    return this.http.get<Employee>(API_V1_EMPLOYEES.READ(id))
  }

  public create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(API_V1_EMPLOYEES.CREATE, employee);
  }

  public update(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(API_V1_EMPLOYEES.UPDATE, employee);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(API_V1_EMPLOYEES.DELETE(id));
  }
}
