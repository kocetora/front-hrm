import { Component, ViewEncapsulation } from '@angular/core';
import { FetchService } from '../core/services/fetch.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FetchService],
})
export class CreateFormComponent {
  output: {id: number | undefined};
  constructor(private fetchService: FetchService) { }

    submit(formData) {
        this.fetchService.addForm(formData).subscribe((res) => console.log(res));
        this.output = { id: undefined };
    }
  }
