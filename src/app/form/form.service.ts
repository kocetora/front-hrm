import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { FormData } from './formData'

@Injectable()
export class FormService {

    constructor(private http: HttpClient) { }

    addForm (form: FormData): Observable<FormData> {
        console.log(form)
        return this.http.post<FormData>('api/form', form)
    }
}