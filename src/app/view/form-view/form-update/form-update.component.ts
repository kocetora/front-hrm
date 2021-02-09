import { Component, OnInit, Input } from '@angular/core';
import { FetchService } from 'src/app/core/services/fetch.service';
import { FormService } from 'src/app/shared/services/form.service';
import { Form } from 'src/app/shared/interfaces/form';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Filter } from 'src/app/shared/interfaces/filter';

@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  providers: [FetchService],
})
export class FormUpdateComponent {
  @Input() form: Form;
  filter: Filter;
  fetchSubscription: Subscription;

  constructor(
    private fetchService: FetchService,
    private formService: FormService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnDestroy() {
    if (this.fetchSubscription) {
      this.fetchSubscription.unsubscribe()
    }
  }

  submit(formData) {
    const formid = this.form.id;
    this.fetchSubscription = this.fetchService.updateForm(formData, formid).pipe(take(1)).subscribe((res) => {
    this.formService.reload();
    this.formService.setForm(res);
    this._snackBar.open('Form successfully updated!:)', 'Close', {
      duration: 5000,
    });     
    }, (err)=> {
      this._snackBar.open('Something went wrong:( The form may have been deleted', 'Close', {
        duration: 5000,
      }); 
    });
  }
}
