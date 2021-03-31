import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../../shared/interfaces/form';
import { Filter } from '../../shared/interfaces/filter';
import { Comment } from '../../shared/interfaces/comment';
import { ApiRoutes } from '../../shared/consts/api-routes.enum';
import { environment } from '../../../environments/environment';

@Injectable()
export class FetchService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // prettier-ignore
      'Authorization': 'Bearer ' + localStorage.jwt,
    }),
  };

  constructor(private http: HttpClient) {}

  addForm(form: Form): Observable<Form> {
    const url = `${ApiRoutes.FORM}`;
    return this.http.post<Form>(`${environment.API_URL}${url}`, form);
  }

  deleteForm(id: number): Observable<{}> {
    const url = `${ApiRoutes.FORM}/${id}`;
    return this.http.delete(`${environment.API_URL}${url}`, this.httpOptions);
  }

  updateForm(form: Form, formid: number): Observable<Form> {
    const url = `${ApiRoutes.FORM}/${formid}`;
    return this.http.put<Form>(
      `${environment.API_URL}${url}`,
      form,
      this.httpOptions
    );
  }

  findForms(filter: Filter): Observable<Form[]> {
    const url = `${ApiRoutes.BASE}`;
    return this.http.post<Form[]>(
      `${environment.API_URL}${url}`,
      filter,
      this.httpOptions
    );
  }

  findPublicForms(filter: Filter): Observable<Form[]> {
    const url = `${ApiRoutes.PUBLIC_BASE}`;
    return this.http.post<Form[]>(
      `${environment.API_URL}${url}`,
      filter,
      this.httpOptions
    );
  }

  getComments(formid: number): Observable<Comment[]> {
    const url = `${ApiRoutes.FORM}/${formid}/${ApiRoutes.COMMENT}`;
    return this.http.get<Comment[]>(
      `${environment.API_URL}${url}`,
      this.httpOptions
    );
  }

  addComment(formid: number, comment: Comment): Observable<Comment[]> {
    const url = `${ApiRoutes.FORM}/${formid}/${ApiRoutes.COMMENT}`;
    return this.http.post<Comment[]>(
      `${environment.API_URL}${url}`,
      comment,
      this.httpOptions
    );
  }
}
