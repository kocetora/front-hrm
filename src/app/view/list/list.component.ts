import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Form } from '../../shared/interfaces/form';
import { FetchService } from '../../core/services/fetch.service';
import { FormService } from '../../shared/services/form.service';
import { Filter } from '../../shared/interfaces/filter';
import { filter, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [FetchService],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit, OnDestroy {
  isAdmin: boolean = localStorage.getItem('role') === 'admin';
  forms: Form[] = [];
  inProcess = false;
  filter: Filter = {};
  form: Form;
  fetchSubscription: Subscription;
  formSubscription: Subscription;
  filterSubscription: Subscription;
  deleteSubscription: Subscription;

  constructor(
    private fetchService: FetchService,
    private formService: FormService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formSubscription = this.formService.getForm().subscribe((form) => {
      this.form = form;
    });
    this.filterSubscription = this.formService
      .getData()
      .subscribe((filterData) => {
        this.filter = filterData;
        this.getFormsFromServer();
      });
    this.formService.sendData(this.filter);
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
    if (this.fetchSubscription) {
      this.fetchSubscription.unsubscribe();
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  getFormsFromServer() {
    this.inProcess = true;
    const request = localStorage.getItem('jwt')
      ? this.fetchService.findForms(this.filter)
      : this.fetchService.findPublicForms(this.filter);
    this.fetchSubscription = request.pipe(take(1)).subscribe(
      (forms) => {
        this.forms = forms;
        if (!this.form) {
          this.selectForm(forms[0]);
        }
        if (!forms) {
          this.selectForm(undefined);
        }
      },
      (err) => console.log(err),
      () => (this.inProcess = false)
    );
  }

  selectForm(form) {
    this.formService.setForm(form);
  }

  deleteItem(id: number) {
    this.inProcess = true;
    this.deleteSubscription = this.fetchService
      .deleteForm(id)
      .pipe(take(1))
      .subscribe(
        () => {
          this.getFormsFromServer();
          this.snackBar.open('The form have been deleted', 'Close', {
            duration: 5000,
          });
        },
        (err) => {
          this.snackBar.open('The form have been deleted', 'Close', {
            duration: 5000,
          });
        }
      );
  }
}
