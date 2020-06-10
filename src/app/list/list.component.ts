import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form } from '../core/interfaces/form';
import { FetchService } from '../core/services/fetch.service';
import { FormService } from '../core/services/form.service';

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
    this.getForms();
    this.setForms();
  }

  getForms(): void {
    this.fetchService.getForms().subscribe(forms => {
      this.formService.setForms(forms);
      });
      // if (this.form[1]) {
      //   this.showForm(1);
      //   this.currentFormId = 1;
      // }
    };
  
  setForms(): void {
    this.formService.getForms().subscribe((forms) => {
      this.forms = forms;
    })
  };

  selectForm(i){
    console.log(i)
  }

  delete(id: number): void {
    this.fetchService
        .deleteForm(id)
        .subscribe();
  }

  deleteItem(id: number) {
    this.delete(id);
    this.getForms();
    // this.showForm(1);
  }

}
