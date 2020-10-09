import { Component } from '@angular/core';
import { FetchService } from '../core/services/fetch.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  providers: [FetchService],
})
export class CreateFormComponent {
  output: { id: number | undefined };
  constructor(private fetchService: FetchService) {}

  submit(formData) {
    this.fetchService.addForm(formData).subscribe((res) => console.log(res));
    this.output = { id: undefined };
  }
}
