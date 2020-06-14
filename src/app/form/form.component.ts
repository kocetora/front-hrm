import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../core/validators/validator';
import { BodyService } from '../core/services/body.service';
import { FetchService } from '../core/services/fetch.service';

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
    'native',
    'fluent',
    'intermediate',
    'basic'
  ];

  constructor(
      private bodyService: BodyService,
      private fetchService: FetchService,
      private formBuilder: FormBuilder) { }


    ngOnInit() {
      this.form = this.formBuilder.group({
        name: ['', [Validators.required, CustomValidators.noWhitespace]],
        surname: ['', [Validators.required, CustomValidators.noWhitespace]],
        sex: [this.genders[0], Validators.required],
        education: [this.grades[0], Validators.required],
        born: ['',  [Validators.required]],
        height: ['',  [Validators.required, Validators.min(30), Validators.max(300)]],
        phoneNumber: ['', [Validators.required, CustomValidators.noWhitespace]],
        email: ['', [Validators.required, Validators.email]],
        prefferedRegion: [''],
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
        languageSkills: this.formBuilder.group({
          english: [],
          russian: [],
          englishProficiency: ['basic', Validators.required],
          russianProficiency: ['basic', Validators.required]
        }),
        professions: this.formBuilder.group({
          trainee: [''],
          dealer: [''],
          inspector: [''],
          manager: [''],
          pit_boss: [''],
          waiter: [''],
          barman: [''],
        })
      });
    }

        // messengers: new FormGroup({
        //   WhatsApp: new FormControl(),
        //   Telegram: new FormControl(),
        //   Viber: new FormControl(),
        //   msWhatsApp: new FormControl(),
        //   msTelegram: new FormControl(),
        //   msViber: new FormControl(),
        // })

    submit() {

        console.log(this.form);
        // const formData = this.bodyService.convertFormData({...this.form.value});
        // this.fetchService.addForm(formData).subscribe();
        // this.form.reset();

    }
  }
