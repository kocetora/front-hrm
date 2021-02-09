import { Injectable } from '@angular/core';
import { Form } from '../../shared/interfaces/form';
import { FormGroup } from '@angular/forms';
import {
  Professions,
  Messengers,
  Languages,
} from '../../shared/consts/form.enum';
@Injectable()
export class PatchService {
  patchData(form: FormGroup, formData?: Form) {
    if (formData !== undefined) {
      const fields: string[] = [
        'name',
        'surname',
        'middlename',
        'sex',
        'height',
        'phoneNumber',
        'email',
        'education',
        'note',
        'expectedSalary',
        'isPublic',
      ];
      fields.forEach((element) => {
        form.patchValue({ [element]: formData[element] });
      });
      form.patchValue({
        preffered_region: formData.prefferedRegion,
      });
      form.patchValue({
        born: formData.born.substring(0, 10),
      });
      const monthsToYears: string[] = ['workExperience', 'unemployedFor'];
      monthsToYears.forEach((element) => {
        form.controls[element].patchValue({
          [element + 'Years']:
            (formData[element] - (formData[element] % 12)) / 12,
          [element + 'Months']: formData[element] % 12,
        });
      });

      formData.messengers.forEach((element) => {
        for (const el in Messengers) {
          if (element.messenger === el) {
            form.controls.messengers.patchValue({
              [el]: element.info,
            });
          }
        }
      });
      for (const el in Languages) {
        form.controls.languages.patchValue({
          [el]: false,
        });
      }
      formData.languageSkills.forEach((element) => {
        for (const el in Languages) {
          if (element.language === el) {
            form.controls.languages.patchValue({
              [el]: true,
            });
          }
        }
      });
      formData.languageSkills.forEach((element) => {
        for (const el in Languages) {
          if (element.language === el) {
            form.controls.languageProficiency.patchValue({
              [el + 'Proficiency']: element.languageProficiency,
            });
          }
        }
      });
      for (const el in Professions) {
        form.controls.professions.patchValue({
          [el]: false,
        });
      }
      formData.professions.forEach((element) => {
        for (const el in Professions) {
          if (element.profession === el) {
            form.controls.professions.patchValue({
              [el]: true,
            });
          }
        }
      });
    } else {
      form.reset();
      Object.keys(form.controls).forEach((key) => {
        form.get(key).setErrors(null);
        if (form.get(key).controls) {
          Object.keys(form.get(key).controls).forEach((innerKey) => {
            form.get(key).controls[innerKey].setErrors(null);
          });
        }
      });
      form.patchValue({
        sex: 'male',
        education: 'primary',
      });
      form.controls.languageProficiency.patchValue({
        englishProficiency: 'basic',
        russianProficiency: 'basic',
      });
    }
  }

  resetFilter(filter: FormGroup) {
    filter.reset();
    Object.keys(filter.controls).forEach((key) => {
      filter.get(key).setErrors(null);
      if (filter.get(key).controls) {
        Object.keys(filter.get(key).controls).forEach((innerKey) => {
          filter.get(key).controls[innerKey].setErrors(null);
        });
      }
    });
    filter.controls.languageProficiency.patchValue({
      englishProficiency: 'basic',
      russianProficiency: 'basic',
    });
  }
}
