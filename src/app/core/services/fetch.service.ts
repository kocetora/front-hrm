import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../interfaces/form';
import { Filter } from '../interfaces/filter';

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
        console.log(form);
        return this.http.post<Form>('api/form', form);
    }

    getForms(): Observable<Form[]> {
        return this.http.get<Form[]>('api/forms', this.httpOptions);
    }

    deleteForm(id: number): Observable<{}> {
        const url = `api/form/${id}`;
        return this.http.delete(url, this.httpOptions);
    }

    updateForm(form: Form): Observable<Form[]> {
        const url = `api/form/${form.formid}`;
        return this.http.put<Form[]>(url, form, this.httpOptions);
    }

    filterForms(filter: Filter): Observable<Form[]> {
        const url = `api/forms/filter`;
        return this.http.post<Form[]>(url, filter, this.httpOptions);
    }
}
