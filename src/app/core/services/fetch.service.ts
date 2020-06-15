import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../../shared/interfaces/form';
import { Filter } from '../../shared/interfaces/filter';
import { Comment } from '../../shared/interfaces/comment';
import { ApiRoutes } from '../../shared/consts/api-routes.enum';

@Injectable()
export class FetchService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.jwt
        })
      };

    constructor(private http: HttpClient) { }

    addForm(form: Form): Observable<Form> {
        const url = ApiRoutes.form;
        return this.http.post<Form>(url, form);
    }

    getForms(): Observable<Form[]> {
        const url = ApiRoutes.forms;
        return this.http.get<Form[]>(url, this.httpOptions);
    }

    deleteForm(id: number): Observable<{}> {
        const url = `${ApiRoutes.form}/${id}`;
        return this.http.delete(url, this.httpOptions);
    }

    updateForm(form: Form): Observable<Form[]> {
        const url = `${ApiRoutes.form}/${form.formid}`;
        return this.http.put<Form[]>(url, form, this.httpOptions);
    }

    filterForms(filter: Filter): Observable<Form[]> {
        const url = ApiRoutes.forms;
        return this.http.post<Form[]>(url, filter, this.httpOptions);
    }

    getComments(formid: number): Observable<Comment[]> {
        const url = `${ApiRoutes.form}/${formid}/${ApiRoutes.comment}`;
        return this.http.get<Comment[]>(url, this.httpOptions);
    }

    addComment(formid: number, comment: Comment): Observable<Comment[]> {
        const url = `${ApiRoutes.form}/${formid}/${ApiRoutes.comment}`;
        return this.http.post<Comment[]>(url, comment, this.httpOptions);
    }
}

