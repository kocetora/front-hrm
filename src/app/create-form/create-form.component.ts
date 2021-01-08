import { Component } from '@angular/core';
import { FetchService } from '../core/services/fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  providers: [FetchService],
})
export class CreateFormComponent {
  output: { id: number | undefined };
  constructor(private fetchService: FetchService, private _snackBar: MatSnackBar) {}

  submit(formData) {
    this.fetchService.addForm(formData).subscribe((res) => {
      console.log(res);
      this._snackBar.open('Form successfully added!:)', 'Close', {
        duration: 5000,
      });
    })
    this.output = { id: undefined };
  }
}
