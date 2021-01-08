import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form } from '../../shared/interfaces/form';
import { FetchService } from '../../core/services/fetch.service';
import { FormService } from '../../shared/services/form.service';
import { Filter } from '../../shared/interfaces/filter';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [FetchService],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  forms: Form[] = [];

  constructor(
    private fetchService: FetchService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.getFormsFromServer();
    this.setThisForms();
  }

  getFormsFromServer(): void {
    const filter: Filter = {};
    const request = localStorage.getItem('jwt') ? 
      this.fetchService.findForms(filter) : 
      this.fetchService.findPublicForms(filter);
      request.subscribe((forms)=>{
        this.formService.setForms(forms);
      })
    this.selectForm(1);
  }

  setThisForms(): void {
    this.formService.getForms().subscribe((forms) => {
      this.forms = forms;
    });
  }

  selectForm(id) {
    if (this.forms[id]) {
      this.formService.setId(undefined);
      setTimeout(() => this.formService.setId(id), 250);
    } else {
      this.formService.setId(undefined);
    }
  }

  delete(id: number): void {
    this.fetchService.deleteForm(id).subscribe();
  }

  deleteItem(id: number) {
    this.delete(id);
    this.getFormsFromServer();
    this.selectForm(1);
  }
}
