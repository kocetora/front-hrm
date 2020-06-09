import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../interfaces/form';
import { Filter } from '../interfaces/filter';
import { Comment } from '../interfaces/comment';

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
        return this.http.post<Form>('form', form);
    }

    getForms(): Observable<Form[]> {
        return this.http.get<Form[]>('forms', this.httpOptions);
    }

    deleteForm(id: number): Observable<{}> {
        const url = `form/${id}`;
        return this.http.delete(url, this.httpOptions);
    }

    updateForm(form: Form): Observable<Form[]> {
        const url = `form/${form.formid}`;
        return this.http.put<Form[]>(url, form, this.httpOptions);
    }

    filterForms(filter: Filter): Observable<Form[]> {
        const url = `forms`;
        return this.http.post<Form[]>(url, filter, this.httpOptions);
    }

    getComments(formid: number): Observable<Comment[]> {
        const url = `form/${formid}/comment/`;
        return this.http.get<Comment[]>(url, this.httpOptions);
    }

    addComment(formid: number, comment: Comment): Observable<Comment[]> {
        const url = `form/${formid}/comment/`;
        return this.http.post<Comment[]>(url, comment, this.httpOptions);
    }
}
