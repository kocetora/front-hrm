import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewService } from './view.service';
import { Form } from './form';
import { Filter } from './filter';
import { FormService } from '../form/form.service';
import { CustomValidators } from '../validators/validator';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ViewService, FormService]
})
export class ViewComponent implements OnInit {
  forms: Form[] = [];
  formsId: number;
  form: FormGroup;
  filter: FormGroup;
  currentFormId: number;
  date: Date;

  constructor(private formService: FormService, private viewService: ViewService, private http: HttpClient) { }

  ngOnInit(): void {
    this.date = new Date;
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
    this.getForms();
  }

  getForms(): void {
    this.viewService.getForms().subscribe(forms => {
      this.forms = forms;
      if (this.form[1]) {
        this.showForm(1);
        this.currentFormId = 1;
      }
    });
  }

  selectForm(i?: any) {
    if (this.forms[i]) {
      this.showForm(i);
    }
  }

  showForm(id: number) {
    this.formsId = id;
    this.currentFormId = this.forms[id].formid;
    this.viewService.patchData(id, this.form, this.forms);
  }

  filterSubmit() {
    if (this.filter.valid) {
      const filterData: Filter = this.viewService.convertFilterData({...this.filter.value});
      this.viewService.filterForm(filterData).subscribe(res => {
          this.forms = res;
      });
    }
  }

    submit() {
    if (this.form.valid) {
      const formData = this.formService.convertFormData({...this.form.value});
      formData.formid = this.currentFormId;
      this.viewService.updateForm(formData).subscribe((res) => {
        this.forms[this.formsId] = res[0];
        this.showForm(this.formsId);
      });
      this.form.reset();
    }
  }

  delete(id: number): void {
    this.viewService
        .deleteForm(id)
        .subscribe(() => console.log('Form Deleted'));
  }

  deleteItem(id?: any) {
    this.delete(id);
    this.getForms();
    this.showForm(1);
  }
}
