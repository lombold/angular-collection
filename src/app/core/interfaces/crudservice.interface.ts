import {Observable} from "rxjs";

export interface CRUDServiceInterface<T> {
  getAll(): Observable<T[]>;
  get(id: string): Observable<T>;
  create(t: T): Observable<T>;
  update(t: T):Observable<T>;
  delete(id: string): Observable<void>;
}
