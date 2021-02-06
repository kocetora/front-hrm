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
  isAdmin: boolean = localStorage.getItem('role') === 'admin';
  forms: Form[] = [];
  inProcess: boolean = false;

  constructor(
    private fetchService: FetchService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.getFormsFromServer();
    this.setThisForms()
  }

  getFormsFromServer(): void {
    this.inProcess = true;
    const filter: Filter = {};
    const request = localStorage.getItem('jwt')
      ? this.fetchService.findForms(filter)
      : this.fetchService.findPublicForms(filter);
    request.subscribe(
      (forms) => this.formService.setForms(forms), 
      (err)=>console.log(err), 
      ()=>this.inProcess = false);
  }

  setThisForms(): void {
    this.formService.getForms().subscribe((forms) => {
      this.forms = forms;
      this.selectForm(1);
    });
  }

  selectForm(id) {
    this.formService.setId(undefined);
    if (this.forms[id]) {
      setTimeout(() => this.formService.setId(id), 250);
    }
  }

  deleteItem(id: number) {
    this.inProcess = true;
    this.fetchService.deleteForm(id).subscribe(()=>{
      this.getFormsFromServer();
    });
  }
}
