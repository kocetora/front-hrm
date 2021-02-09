import { Injectable } from '@angular/core';
import { Form } from '../../shared/interfaces/form';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../interfaces/filter';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private filter: BehaviorSubject<Filter>;
  private form: BehaviorSubject<Form>;
  previous: Filter;

  constructor() {
    this.filter = new BehaviorSubject<Filter>({})
    this.form = new BehaviorSubject<Form>(undefined);
  }

  sendData(newValue: Filter): void {
    this.filter.next(newValue);
    this.previous = newValue
  }

  reload(){
    this.filter.next(this.previous)
  }

  getData(): Observable<Filter> {
    return this.filter.asObservable();
  }

  getForm(): Observable<Form> {
    return this.form.asObservable();
  }

  setForm(newValue): void {
    this.form.next(newValue);
  }
}
