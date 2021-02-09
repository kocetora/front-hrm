import { Component } from '@angular/core';
import { FetchService } from '../core/services/fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Form } from '../shared/interfaces/form';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  providers: [FetchService],
})
export class CreateFormComponent {
  output: Form;
  constructor(
    private fetchService: FetchService,
    private _snackBar: MatSnackBar
  ) {}

  submit(formData) {
    this.fetchService.addForm(formData).subscribe(
      (res) => {
        this._snackBar.open('Form successfully added!:)', 'Close', {
          duration: 5000,
        });
      },
      (err) => {
        this._snackBar.open('Something went wrong:(', 'Close', {
          duration: 5000,
        });
      }
    );
    this.output = undefined;
  }
}
