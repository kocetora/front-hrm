import { Component, OnInit } from '@angular/core';
import { FetchService } from '../../core/services/fetch.service';
import { FormService } from '../../shared/services/form.service';
import { Form } from '../../shared/interfaces/form';

@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  providers: [FetchService],
})
export class FormUpdateComponent implements OnInit {
  forms: Form[];
  id: number | undefined;
  output: { id: number | undefined; formData?: Form };

  constructor(
    private fetchService: FetchService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.formService.getForms().subscribe((forms) => {
      this.forms = forms;
    });
    this.formService.getId().subscribe((id) => {
      this.id = id;
      id !== undefined
        ? (this.output = { id, formData: this.forms[id] })
        : (this.output = { id: undefined });
    });
  }

  submit(formData) {
   
    const formid = this.forms[this.id].id;
    this.fetchService.updateForm(formData, formid).subscribe((res) => {
      this.forms[this.id] = res[0];
      this.formService.setForms(this.forms);
      this.formService.setId(this.id);
    });
  }
}
