import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from 'src/app/shared/interfaces/comment';
import { noWhitespace } from 'src/app/shared/validators/noWhitespace';
import { FetchService } from 'src/app/core/services/fetch.service';
import { Form } from 'src/app/shared/interfaces/form';
import { take } from 'rxjs/operators';
import { FormService } from 'src/app/shared/services/form.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  providers: [FetchService],
})
export class CommentListComponent implements OnInit, OnChanges {
  @Input() form: Form;
  @Output() onsubmit: EventEmitter<void> = new EventEmitter();

  comments: Comment[] = [];
  comment: FormGroup;
  userid: number;
  username: string;

  constructor(
    private fetchService: FetchService,
    private formService: FormService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.username = localStorage.username;
    this.userid = localStorage.userid;
    this.comment = new FormGroup({
      text: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        noWhitespace,
      ]),
    });
  }

  ngOnChanges(form) {
    this.form = form.form.currentValue;
    this.getComment();
  }

  getComment() {
    if (this.form) {
      this.fetchService
        .getComments(this.form.id)
        .pipe(take(1))
        .subscribe((comments) => {
          this.comments = comments;
        });
    }
  }

  addComment() {
    if (this.comment.valid && this.form) {
      const comment: Comment = {
        comment: this.comment.value.text,
        userid: this.userid,
      };
      this.fetchService.addComment(this.form.id, comment).subscribe(
        () => {
          this.comment.reset();
          this.formService.reload();
          this.getComment();
          this.comment.get('text').setErrors(null);
        },
        (err) => {
          this.snackBar.open(
            'Something went wrong:( The form may have been deleted',
            'Close',
            {
              duration: 5000,
            }
          );
        }
      );
    }
  }
}
