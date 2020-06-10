import { Injectable } from '@angular/core';
import { Form } from '../interfaces/form';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private forms: BehaviorSubject<Form[]>;

  constructor() {
    this.forms = new BehaviorSubject<Form[]>([]);
  }

  getForms(): Observable<Form[]> {
    return this.forms.asObservable();
  }
  setForms(newValue): void {
    this.forms.next(newValue);
  }
}
