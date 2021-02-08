import { Component } from '@angular/core';
import { Form } from 'src/app/shared/interfaces/form';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
})
export class FormViewComponent { 
  isAdmin: boolean = localStorage.getItem('role') === 'admin';
  update = false;
  forms: Form[];
  id: number | undefined;

  constructor(
    private formService: FormService,
  ) {}

  ngOnInit(): void {
    this.formService.getForms().subscribe((forms) => {
      this.forms = forms;
    });
    this.formService.getId().subscribe((id) => {
      this.id = id;
    });
  }

  openUpdate() {
    if (this.isAdmin) {
      this.update = !this.update;
    }
  }
 }