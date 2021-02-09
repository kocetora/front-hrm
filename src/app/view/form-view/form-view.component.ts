import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Form } from 'src/app/shared/interfaces/form';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
})
export class FormViewComponent { 
  isAdmin: boolean = localStorage.getItem('role') === 'admin';
  update = false;
  form: Form;
  formSubscription: Subscription;

  constructor(
    private formService: FormService,
  ) {}

  ngOnInit(): void {
    this.formService.getForm().subscribe((form) => {
      this.form = form;
    });
  }

  ngOnDestroy() {
    if(this.formSubscription){
      this.formSubscription.unsubscribe()
    }
  }

  openUpdate() {
    if (this.isAdmin) {
      this.update = !this.update;
    }
  }
 }