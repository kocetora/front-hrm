import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewService } from './view.service';
import { Form } from './form';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [ViewService]
})
export class ViewComponent implements OnInit {
  form:Form[]

  constructor(private ViewService: ViewService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getForms();
  }

  getForms (): void {
    this.ViewService.getForms().subscribe(form => console.log(form))
  }
  
  // delete (torm: Torm): void {
  //     this.torms = this.torms.filter(h => h !== torm)
  //     this.tormService
  //         .deleteTorm(torm.id)
  //         .subscribe(() => console.log('Torm Deleted'))
  // }
  
  // edit (torm) {
  //     this.editTorm = torm
  // }
  
  // update () {
  //     if (this.editTorm) {
  //         this.tormService.updateTorm(this.editTorm).subscribe(() => {
  //             this.getTorms()
  //         })
  //         this.editTorm = undefined
  //     }
  // }

}
