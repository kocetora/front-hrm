import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../../shared/interfaces/comment';
import { noWhitespace } from '../../shared/validators/noWhitespace';
import { FetchService } from '../../core/services/fetch.service';
import { FormService } from '../../shared/services/form.service';
import { Form } from '../../shared/interfaces/form';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [FetchService]
})
export class CommentComponent implements OnInit {
  id: number | undefined;
  comments: Comment[] = [];
  comment: FormGroup;
  userid: number;
  username: string;
  forms: Form[];

  constructor(
    private fetchService: FetchService,
    private formService: FormService) { }

  ngOnInit(): void {
    this.formService.getId().subscribe((id) => {
      this.id = id;
      this.getComments();
    });
    this.formService.getForms().subscribe((forms) => {
      this.forms = forms;
    });
    this.username = localStorage.username;
    this.userid = localStorage.userid;
    this.comment = new FormGroup({
      text: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        noWhitespace
      ])
    });
  }

  getComments() {
    if (this.id !== undefined) {
      this.fetchService.getComments(this.forms[this.id].formid)
      .subscribe(comments => {
        this.comments = comments;
      });
    }
  }

  addComment() {
    if (this.comment.valid && this.id !== undefined) {
      const comment: Comment = {
        comment: this.comment.value.text,
        username: this.username,
        userid: this.userid
      };
      this.fetchService.addComment(this.forms[this.id].formid, comment)
      .subscribe(() => {
        this.getComments();
        this.comment.reset();
      });
    }
  }
}
