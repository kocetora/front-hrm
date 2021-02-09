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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [BodyService, PatchService],
})
export class FormComponent implements OnChanges {
  readonly requiredTextInputs = ['email', 'name', 'surname'];

  readonly textInputs = ['middlename', 'preffered_region'];

  @Output() onsubmit: EventEmitter<Form> = new EventEmitter<Form>();
  @Input() input: Form;

  readonly genders = Genders;
  readonly grades = Grades;
  readonly professions = Professions;
  readonly messengers = Messengers;
  readonly languages = Languages;
  readonly languageProficiency = LanguageProficiency;
  readonly sizeLimitation: number = 4194304;
  form: FormGroup;
  isPublic = false;
  pictures: string[] = [];
  currentPicture = '';
  currentIndex = 0;
  primary: number | null = null;
  reading = false;

  constructor(
    private bodyService: BodyService,
    private patchService: PatchService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.maxLength(128), noWhitespace],
      ],
      surname: [
        '',
        [Validators.required, Validators.maxLength(128), noWhitespace],
      ],
      middlename: ['', [Validators.maxLength(128)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(128)],
      ],
      preffered_region: ['', [Validators.maxLength(128)]],
      sex: ['male', Validators.required],
      education: ['higher', Validators.required],
      born: ['', [Validators.required]],
      isPublic: [false, []],
      height: [
        '',
        [Validators.required, Validators.min(0), Validators.max(2147483647)],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.maxLength(128), noWhitespace],
      ],
      expectedSalary: [
        '',
        [Validators.required, Validators.min(0), Validators.max(2147483647)],
      ],
      note: ['', Validators.maxLength(255)],
      unemployedFor: this.formBuilder.group({
        unemployedForYears: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        unemployedForMonths: [
          '',
          [Validators.required, Validators.min(0), Validators.max(11)],
        ],
      }),
      workExperience: this.formBuilder.group({
        workExperienceYears: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        workExperienceMonths: [
          '',
          [Validators.required, Validators.min(0), Validators.max(11)],
        ],
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
          WhatsApp: ['', Validators.maxLength(128)],
          Telegram: ['', Validators.maxLength(128)],
          Viber: ['', Validators.maxLength(128)],
        },
        { validator: atLeastOne(Validators.required) }
      ),
    });
  }

  deletePhoto() {
    this.pictures.splice(this.currentIndex, 1);
    this.slideLeft();
    this._snackBar.open('Deleted', 'Close', {
      duration: 2000,
    });
  }

  transformPictures(files: File[], bytes: string[] = [], i = 0): void {
    this.reading = true;
    const file = files[i];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const byte = reader.result;
        if (typeof byte === 'string' && byte.length < this.sizeLimitation) {
          bytes.push(byte);
        } else {
          this._snackBar.open(`Picture ${file.name} is too large`, 'Close', {
            duration: 5000,
          });
        }
        i++;
        return this.transformPictures(files, bytes, i);
      };
      reader.readAsDataURL(file);
    } else {
      const newCurrent = this.pictures.length;
      this.pictures = this.pictures.concat(bytes);
      this.currentIndex =
        this.pictures.length <= newCurrent
          ? this.pictures.length - 1
          : newCurrent;
      this.currentPicture = this.pictures[this.currentIndex];
      this.reading = false;
    }
  }

  chooseAvatar() {
    this.primary = this.currentIndex;
    this._snackBar.open('Selected primary', 'Close', {
      duration: 2000,
    });
  }

  onFileSelected(event) {
    const files = event.target.files;
    this.transformPictures(files);
  }

  slideLeft() {
    this.currentIndex =
      this.currentIndex - 1 < 0
        ? this.pictures.length - 1
        : this.currentIndex - 1;
    this.currentPicture = this.pictures[this.currentIndex];
  }

  slideRight() {
    this.currentIndex =
      this.currentIndex + 1 > this.pictures.length - 1
        ? 0
        : this.currentIndex + 1;
    this.currentPicture = this.pictures[this.currentIndex];
  }

  ngOnChanges(input) {
    if (input.input.currentValue) {
      this.patchService.patchData(this.form, input.input.currentValue);
      for (const image of input.input.currentValue.images) {
        if (image.primary) {
          this.currentPicture = image.avatar;
        }
      }
      this.pictures = input.input.currentValue.images.map((image) => {
        return image.avatar;
      });
      if (!this.currentPicture) {
        this.currentPicture = this.pictures[0];
      }
      this.reading = false;
    }
  }

  submit() {
    if (this.form.valid !== undefined) {
      const formData: Form = this.bodyService.convertFormData({
        ...this.form.value,
      });
      formData.images = this.pictures.map((avatar, i) => {
        return {
          primary: i === this.primary ? true : false,
          avatar,
        };
      });
      this.onsubmit.emit(formData);
      this.form.reset();
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key).setErrors(null);
        if (this.form.get(key).controls) {
          Object.keys(this.form.get(key).controls).forEach((innerKey) => {
            this.form.get(key).controls[innerKey].setErrors(null);
          });
        }
      });
    }
  }
}
