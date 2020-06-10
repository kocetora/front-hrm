import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../core/interfaces/comment';
import { CustomValidators } from '../core/validators/validator';
import { FetchService } from '../core/services/fetch.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [FetchService]
})
export class CommentComponent implements OnInit {
  comments: Comment[] = [];
  comment: FormGroup;

  constructor(private fetchService: FetchService) { }

  ngOnInit(): void {
    this.comment = new FormGroup({
      text: new FormControl('', [
        Validators.required,
        CustomValidators.noWhitespace,
        Validators.maxLength(255)
      ])
    });
  }

  getComments() {
    // this.fetchService.getComments(this.currentFormId)
    // .subscribe(res => {
    //   this.comments = res;
    // });
  }

  addComment() {
    // if (this.comment.valid && this.form.valid) {
    //   const comment: Comment = {
    //     comment: this.comment.value.text,
    //     userid: this.userid
    //   };
    //   this.fetchService.addComment(this.currentFormId, comment)
    //   .subscribe(() => {
    //     this.getComments();
    //   });
    // }
  }
}
