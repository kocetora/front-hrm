import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../core/validators/validator';
import { FetchService } from '../../core/services/fetch.service';
import { PatchService } from '../../core/services/patch.service';
import { FormService } from '../../core/services/form.service';
import { Form } from '../../core/interfaces/form';

@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.scss'],
  providers: [ FetchService, PatchService]
})
export class FormUpdateComponent implements OnInit {
  forms: Form[];
  // form: FormGroup;
  id: number | undefined;

  constructor(
    private fetchService: FetchService,
    private patchService: PatchService,
    private formService: FormService) { }

    ngOnInit(): void {
      // this.formService.getForms().subscribe((forms) => {
      //   this.forms = forms;
      // });
      // this.formService.getId().subscribe((id) => {
      //   this.id = id;
      //   if (id !== undefined) {
      //     this.patchService.patchData(id, this.form, this.forms);
      //   } else {
      //     this.form.reset();
      //   }
      // });
    }

  submit(formData) {
    formData.formid = this.forms[this.id].formid;
    this.fetchService.updateForm(formData).subscribe((res) => {
      this.forms[this.id] = res[0];
      this.formService.setForms(this.forms);
      this.formService.setId(this.id);
    });
  }
}
