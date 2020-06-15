import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/validator';
import { BodyService } from '../../services/body.service';
import { PatchService } from '../../services/patch.service';
import { atLeastOne } from '../../validators/atLeastOne';
import { Form } from '../../../shared/interfaces/form';
import { FormEnums } from '../../../shared/consts/form.enum';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [BodyService, PatchService],
})
export class FormComponent implements OnInit {

  @Output() onSubmit: EventEmitter<Form> = new EventEmitter<Form>();
  @Input() input: {id: number|undefined; formdata?: Form};

  readonly genders = FormEnums.Genders;
  readonly grades = FormEnums.Grades;
  readonly professions = FormEnums.Professions;
  readonly messengers = FormEnums.Messengers;
  readonly languages = FormEnums.Languages;
  readonly languageProficiency = FormEnums.LanguageProficiency;
  form: any;

  constructor(
      private bodyService: BodyService,
      private patchService: PatchService,
      private formBuilder: FormBuilder) { }

    ngOnInit() {
      this.form = this.formBuilder.group({
        name: ['', [Validators.required, CustomValidators.noWhitespace, Validators.maxLength(255)]],
        surname: ['', [Validators.required, CustomValidators.noWhitespace, Validators.maxLength(255)]],
        sex: ['male', Validators.required],
        education: ['higher', Validators.required],
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
          englishProficiency: ['basic', Validators.required],
          russianProficiency: ['basic', Validators.required]
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

    ngOnChanges(input) {
      if (input.input.previousValue) {
        this.patchService.patchData(input.input.currentValue.id, this.form, input.input.currentValue.formData);
      }
    }

    submit() {
      if (this.form.valid !== undefined) {
        const formData: Form = this.bodyService.convertFormData({...this.form.value});
        this.onSubmit.emit(formData);
      }
    }
  }
