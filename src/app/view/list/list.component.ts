import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form } from '../../core/interfaces/form';
import { FetchService } from '../../core/services/fetch.service';
import { FormService } from '../../core/services/form.service';

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
  ) { }

  ngOnInit(): void {
    this.getFormsFromServer();
    this.setThisForms();
  }

  getFormsFromServer(): void {
    this.fetchService.getForms().subscribe(forms => {
      this.formService.setForms(forms);
      });
    this.selectForm(1);
    }

  setThisForms(): void {
    this.formService.getForms().subscribe((forms) => {
      this.forms = forms;
    });
  }

  selectForm(id) {
    if (this.forms[id]) {
      this.formService.setId(id);
    } else {
      this.formService.setId(undefined);
    }
  }

  delete(id: number): void {
    this.fetchService
        .deleteForm(id)
        .subscribe();
  }

  deleteItem(id: number) {
    this.delete(id);
    this.getFormsFromServer();
    this.selectForm(1);
  }

}
