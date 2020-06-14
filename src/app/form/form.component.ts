import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../core/validators/validator';
import { BodyService } from '../core/services/body.service';
import { FetchService } from '../core/services/fetch.service';
import { atLeastOne } from '../core/validators/atLeastOne';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [BodyService, FetchService],
})
export class FormComponent implements OnInit {
  form: any;
  genders = [
    'male',
    'female'
  ];
  grades = [
    'primary',
    'secondary',
    'unfinished_higher',
    'higher'
  ];
  professions = [
    'trainee',
    'dealer',
    'inspector',
    'manager',
    'pit_boss',
    'waiter',
    'barman'
  ];
  messengers = [
    'Telegram',
    'Viber',
    'WhatsApp'
  ];
  languages = ['russian', 'english'];
  languageProficiency = [
    'basic',
    'intermediate',
    'fluent',
    'native'
  ];

  constructor(
      private bodyService: BodyService,
      private fetchService: FetchService,
      private formBuilder: FormBuilder) { }


    ngOnInit() {
      this.form = this.formBuilder.group({
        name: ['', [Validators.required, CustomValidators.noWhitespace, Validators.maxLength(255)]],
        surname: ['', [Validators.required, CustomValidators.noWhitespace, Validators.maxLength(255)]],
        sex: [this.genders[0], Validators.required],
        education: [this.grades[0], Validators.required],
        born: ['',  [Validators.required]],
        height: ['',  [Validators.required, Validators.min(30), Validators.max(300)]],
        phoneNumber: ['', [Validators.required, CustomValidators.noWhitespace, Validators.maxLength(255)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
        prefferedRegion: ['', Validators.maxLength(255)],
        expectedSalary: ['', [Validators.required, Validators.min(1), Validators.max(100000)]],
        note: ['', Validators.maxLength(255)],
        unemployedFor: this.formBuilder.group({
        unemployedForYears: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
        unemployedForMonths: ['', [Validators.required, Validators.min(0), Validators.max(11)]],
        }),
        workExperience: this.formBuilder.group({
          workExperienceYears: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
          workExperienceMonths: ['', [Validators.required, Validators.min(0), Validators.max(11)]],
        }),
        languages: this.formBuilder.group({
          english: [],
          russian: [],
        }, { validator: atLeastOne(Validators.required) }),
        languageProficiency: this.formBuilder.group({
          englishProficiency: [this.languageProficiency[0], Validators.required],
          russianProficiency: [this.languageProficiency[0], Validators.required]
        }),
        professions: this.formBuilder.group({
          trainee: [],
          dealer: [],
          inspector: [],
          manager: [],
          pit_boss: [],
          waiter: [],
          barman: [],
        }, { validator: atLeastOne(Validators.required) }),
        messengers: this.formBuilder.group({
          WhatsApp: ['', Validators.maxLength(255)],
          Telegram: ['', Validators.maxLength(255)],
          Viber: ['', Validators.maxLength(255)],
        }, { validator: atLeastOne(Validators.required) })
      });
    }

    submit() {

        console.log(this.form);
        // const formData = this.bodyService.convertFormData({...this.form.value});
        // this.fetchService.addForm(formData).subscribe();
        // this.form.reset();

    }
  }
