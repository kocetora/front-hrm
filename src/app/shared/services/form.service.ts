import { Injectable } from '@angular/core';
import { Form } from '../../shared/interfaces/form';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private forms: BehaviorSubject<Form[]>;
  private id: BehaviorSubject<number | undefined>;

  constructor() {
    this.forms = new BehaviorSubject<Form[]>([]);
    this.id = new BehaviorSubject<number | undefined>(undefined);
  }

  getForms(): Observable<Form[]> {
    return this.forms.asObservable();
  }

  setForms(newValue): void {
    this.forms.next(newValue);
  }

  getId(): Observable<number | undefined> {
    return this.id.asObservable();
  }

  setId(id: number | undefined): void {
    this.id.next(id);
  }
}
