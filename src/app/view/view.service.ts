import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Form } from './form'

@Injectable()
export class ViewService {

    constructor(private http: HttpClient) { }

    getForms (): Observable<Form[]> {
        return this.http.get<Form[]>('api/forms')
    }

    // deleteForm (id: number): Observable<{}> {
    //     const url = `api/form/${id}`
    //     return this.http.delete(url)
    // }

    // updateForm (form: Form): Observable<{}> {
    //     const url = `api/form/${form.id}`
    //     return this.http.put<Form>(url, form)
    // }
}