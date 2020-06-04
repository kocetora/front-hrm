import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Form } from '../core/interfaces/form';
import { Filter } from '../core/interfaces/filter';
import { Comment } from '../core/interfaces/comment';
import { CustomValidators } from '../core/validators/validator';
import { BodyService } from '../core/services/body.service';
import { FetchService } from '../core/services/fetch.service';
import { PatchService } from '../core/services/patch.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [BodyService, FetchService, PatchService]
})
export class ViewComponent implements OnInit {
  forms: Form[] = [];
  comments: Comment[] = [];
  formsId: number;
  form: FormGroup;
  filter: FormGroup;
  currentFormId: number;
  date: Date;
  comment: FormGroup;
  username: string;
  userid: number;

  constructor(
    private bodyService: BodyService,
    private fetchService: FetchService,
    private patchService: PatchService) { }

  ngOnInit(): void {
    this.userid = localStorage.userid;
    this.username = localStorage.username;
    this.date = new Date();
    this.filter = new FormGroup({
      sex: new FormControl('male', ),
      height: new FormGroup({
        heightFrom: new FormControl(30, [
          Validators.min(30),
          Validators.max(300),
          Validators.required
        ]),
        heightTo: new FormControl(300, [
          Validators.min(30),
          Validators.max(300),
          Validators.required
        ])
      }),
      age: new FormGroup({
        ageFrom: new FormControl(14, [
          Validators.min(14),
          Validators.max(100),
          Validators.required
        ]),
        ageTo: new FormControl(100, [
          Validators.min(14),
          Validators.max(100),
          Validators.required
        ])
      }),
      workExperienceFrom: new FormGroup({
        workExperienceYearsFrom: new FormControl(0, [
          Validators.min(0),
          Validators.max(100),
          Validators.required
        ]),
        workExperienceMonthsFrom: new FormControl(0, [
          Validators.min(0),
          Validators.max(11),
          Validators.required
        ]),
      }),
      workExperienceTo: new FormGroup({
        workExperienceYearsTo: new FormControl(100, [
          Validators.min(0),
          Validators.max(100),
          Validators.required
        ]),
        workExperienceMonthsTo: new FormControl(11, [
          Validators.min(0),
          Validators.max(11),
          Validators.required
        ]),
      }),
      education: new FormControl('higher'),
      expectedSalary: new FormGroup({
        expectedSalaryFrom: new FormControl(1, [
          Validators.min(1),
          Validators.max(100000),
          Validators.required
        ]),
        expectedSalaryTo: new FormControl(100000, [
          Validators.min(1),
          Validators.max(100000),
          Validators.required
        ]),
      }),
      professions: new FormGroup({
        trainee: new FormControl(),
        dealer: new FormControl(),
        inspector: new FormControl(),
        manager: new FormControl(),
        pit_boss: new FormControl(),
        waiter: new FormControl(),
        barman: new FormControl(),
      }),
      messengers: new FormGroup({
        WhatsApp: new FormControl(),
        Telegram: new FormControl(),
        Viber: new FormControl(),
      }),
      languageSkills: new FormGroup({
        language: new FormControl('russian'),
        languageProficiency: new FormControl('basic'),
      }),
    });

    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        CustomValidators.noWhitespace
      ]),
      surname: new FormControl('', [
        Validators.required,
        CustomValidators.noWhitespace
      ]),
      sex: new FormControl('male', ),
      born: new FormControl('', [
        Validators.required]),
      height: new FormControl(0, [
        Validators.min(30),
        Validators.max(300),
        Validators.required
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        CustomValidators.noWhitespace
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required]),
      education: new FormControl('higher'),
      prefferedRegion: new FormControl(''),
      expectedSalary: new FormControl(0, [
        Validators.min(1),
      ]),
      unemployedFor: new FormGroup({
        unemployedForYears: new FormControl(0, [
          Validators.min(0),
          Validators.max(100),
          Validators.required
        ]),
        unemployedForMonths: new FormControl(0, [
          Validators.min(0),
          Validators.max(11),
          Validators.required
        ])
      }),
      workExperience: new FormGroup({
        workExperienceYears: new FormControl(0, [
          Validators.min(0),
          Validators.max(100),
          Validators.required
        ]),
        workExperienceMonths: new FormControl(0, [
          Validators.min(0),
          Validators.max(11),
          Validators.required
        ]),
      }),
      note: new FormControl(''),
      languageSkills: new FormGroup({
        english: new FormControl(),
        russian: new FormControl(),
        englishProficiency: new FormControl('basic'),
        russianProficiency: new FormControl('basic')
      }),
      professions: new FormGroup({
        trainee: new FormControl(),
        dealer: new FormControl(),
        inspector: new FormControl(),
        manager: new FormControl(),
        pit_boss: new FormControl(),
        waiter: new FormControl(),
        barman: new FormControl(),
      }),
      messengers: new FormGroup({
        WhatsApp: new FormControl(),
        Telegram: new FormControl(),
        Viber: new FormControl(),
        msWhatsApp: new FormControl(),
        msTelegram: new FormControl(),
        msViber: new FormControl(),
      })
    });
    this.comment = new FormGroup({
      text: new FormControl('', [
        Validators.required,
        CustomValidators.noWhitespace,
        Validators.maxLength(255)
      ])
    });
    this.getForms();
  }

  filterSubmit() {
    if (this.filter.valid) {
      const filterData: Filter = this.bodyService.convertFilterData({...this.filter.value});
      this.fetchService.filterForms(filterData).subscribe(res => {
          this.forms = res;
      });
    }
  }

//

  getForms(): void {
    this.fetchService.getForms().subscribe(forms => {
      this.forms = forms;
      if (this.form[1]) {
        this.showForm(1);
        this.currentFormId = 1;
      }
    });
  }

  delete(id: number): void {
    this.fetchService
        .deleteForm(id)
        .subscribe(() => console.log('Form Deleted'));
  }

  deleteItem(id?: any) {
    this.delete(id);
    this.getForms();
    this.showForm(1);
  }

//

  selectForm(i?: any) {
    if (this.forms[i]) {
      this.showForm(i);
      this.getComments();
    }
  }

  showForm(id: number) {
    this.formsId = id;
    this.currentFormId = this.forms[id].formid;
    this.patchService.patchData(id, this.form, this.forms);
  }

  submit() {
    if (this.form.valid) {
      const formData = this.bodyService.convertFormData({...this.form.value});
      formData.formid = this.currentFormId;
      this.fetchService.updateForm(formData).subscribe((res) => {
        this.forms[this.formsId] = res[0];
        this.showForm(this.formsId);
      });
      this.form.reset();
    }
  }

//

  getComments() {
    this.fetchService.getComments(this.currentFormId)
    .subscribe(res => {
      console.log(res);
      this.comments = res;
    });
  }

  addComment() {
    if (this.comment.valid && this.form.valid) {
      const comment: Comment = {
        comment: this.comment.value.text,
        userid: this.userid
      };
      this.fetchService.addComment(this.currentFormId, comment)
      .subscribe(() => {
        this.getComments();
      });
    }
  }


}
