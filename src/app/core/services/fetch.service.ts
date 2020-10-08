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
          Authorization: 'Bearer ' + localStorage.jwt
        })
      };

    constructor(private http: HttpClient) { }

    addForm(form: Form): Observable<Form> {
        const url = `${ApiRoutes.FORM}`;
        return this.http.post<Form>(`${environment.API_URL}${url}`, form);
    }

    getForms(): Observable<Form[]> {
        const url = `${ApiRoutes.BASE}`;
        return this.http.get<Form[]>(`${environment.API_URL}${url}`, this.httpOptions);
    }

    deleteForm(id: number): Observable<{}> {
        const url = `${ApiRoutes.FORM}/${id}`;
        return this.http.delete(`${environment.API_URL}${url}`, this.httpOptions);
    }

    updateForm(form: Form): Observable<Form[]> {
        const url = `${ApiRoutes.FORM}/${form.formid}`;
        return this.http.put<Form[]>(`${environment.API_URL}${url}`, form, this.httpOptions);
    }

    filterForms(filter: Filter): Observable<Form[]> {
        const url = `${ApiRoutes.BASE}`;
        return this.http.post<Form[]>(`${environment.API_URL}${url}`, filter, this.httpOptions);
    }

    getComments(formid: number): Observable<Comment[]> {
        const url = `${ApiRoutes.FORM}/${formid}/${ApiRoutes.COMMENT}`;
        return this.http.get<Comment[]>(`${environment.API_URL}${url}`, this.httpOptions);
    }

    addComment(formid: number, comment: Comment): Observable<Comment[]> {
        const url = `${ApiRoutes.FORM}/${formid}/${ApiRoutes.COMMENT}`;
        return this.http.post<Comment[]>(`${environment.API_URL}${url}`, comment, this.httpOptions);
    }
}

