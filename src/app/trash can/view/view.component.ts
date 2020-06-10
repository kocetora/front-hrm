import { Component, OnInit, ViewEncapsulation } from '@angular/core';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  encapsulation: ViewEncapsulation.None,
  
})
export class ViewComponent implements OnInit {
  formsId: number;
  currentFormId: number;
  date: Date;
  username: string;
  userid: number;

  ngOnInit(): void {
    this.userid = localStorage.userid;
    this.username = localStorage.username;    
  }
  
}
