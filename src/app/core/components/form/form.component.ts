import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespace } from '../../../shared/validators/noWhitespace';
import { atLeastOne } from '../../../shared/validators/atLeastOne';
import { BodyService } from '../../services/body.service';
import { PatchService } from '../../services/patch.service';
import { Form } from '../../../shared/interfaces/form';
import {
  Genders,
  Grades,
  Professions,
  Messengers,
  Languages,
  LanguageProficiency,
} from '../../../shared/consts/form.enum';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [BodyService, PatchService],
})
export class FormComponent implements OnChanges {
  readonly textInputs = [
    'name',
    'surname',
    'middlename',
    'email',
    'preffered_region',
  ];

  @Output() onsubmit: EventEmitter<Form> = new EventEmitter<Form>();
  @Input() input: { id: number | undefined; formdata?: Form };

  readonly genders = Genders;
  readonly grades = Grades;
  readonly professions = Professions;
  readonly messengers = Messengers;
  readonly languages = Languages;
  readonly languageProficiency = LanguageProficiency;
  public form: FormGroup;

  constructor(
    private bodyService: BodyService,
    private patchService: PatchService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name:
        // prettier-mode matrix
        ['', [Validators.required, Validators.maxLength(255), noWhitespace]],
      surname:
        // prettier-mode matrix
        ['', [Validators.required, Validators.maxLength(255), noWhitespace]],
      middlename:
        // prettier-mode matrix
        ['', [Validators.required, Validators.maxLength(255), noWhitespace]],
      email:
        // prettier-mode matrix
        [
          '',
          [Validators.required, Validators.email, Validators.maxLength(255)],
        ],
      preffered_region:
        // prettier-mode matrix
        ['', [Validators.required, Validators.maxLength(255), noWhitespace]],
      sex: ['male', Validators.required],
      education: ['higher', Validators.required],
      born: ['', [Validators.required]],
      height:
        // prettier-mode matrix
        ['', [Validators.required, Validators.min(30), Validators.max(300)]],
      phoneNumber:
        // prettier-mode matrix
        ['', [Validators.required, Validators.maxLength(255), noWhitespace]],
      expectedSalary:
        // prettier-mode matrix
        ['', [Validators.required, Validators.min(1), Validators.max(100000)]],
      note: ['', Validators.maxLength(255)],
      unemployedFor: this.formBuilder.group({
        unemployedForYears:
          // prettier-mode matrix
          ['', [Validators.required, Validators.min(0), Validators.max(100)]],
        unemployedForMonths:
          // prettier-mode matrix
          ['', [Validators.required, Validators.min(0), Validators.max(11)]],
      }),
      workExperience: this.formBuilder.group({
        workExperienceYears:
          // prettier-mode matrix
          ['', [Validators.required, Validators.min(0), Validators.max(100)]],
        workExperienceMonths:
          // prettier-mode matrix
          ['', [Validators.required, Validators.min(0), Validators.max(11)]],
      }),
      languages: this.formBuilder.group(
        {
          english: [],
          russian: [],
        },
        { validator: atLeastOne(Validators.required) }
      ),
      languageProficiency: this.formBuilder.group({
        englishProficiency: ['basic', Validators.required],
        russianProficiency: ['basic', Validators.required],
      }),
      professions: this.formBuilder.group(
        {
          trainee: [],
          dealer: [],
          inspector: [],
          manager: [],
          pit_boss: [],
          waiter: [],
          barman: [],
        },
        { validator: atLeastOne(Validators.required) }
      ),
      messengers: this.formBuilder.group(
        {
          WhatsApp: ['', Validators.maxLength(255)],
          Telegram: ['', Validators.maxLength(255)],
          Viber: ['', Validators.maxLength(255)],
        },
        { validator: atLeastOne(Validators.required) }
      ),
    });
  }

  ngOnChanges(input) {
    if (input.input.previousValue) {
      this.patchService.patchData(
        input.input.currentValue.id,
        this.form,
        input.input.currentValue.formData
      );
    }
  }

  submit() {
    if (this.form.valid !== undefined) {
      const formData: Form = this.bodyService.convertFormData({
        ...this.form.value,
      });
      this.onsubmit.emit(formData);
      this.form.reset();
    }
  }
}
