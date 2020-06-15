import { Injectable } from '@angular/core';
import { Form } from '../../shared/interfaces/form';
import { FormGroup } from '@angular/forms';
import { Professions, Messengers, Languages, LanguageProficiency } from '../../shared/consts/form.enum';
@Injectable()
export class PatchService {

  patchData(id: number | undefined, form: FormGroup, formData?: Form) {
    if (id !== undefined) {
      const fields: string[] = [
          'name',
          'surname',
          'sex',
          'born',
          'height',
          'phoneNumber',
          'email',
          'education',
          'prefferedRegion',
          'note',
          'expectedSalary'
        ];
      fields.forEach(element => {
          form.patchValue({[element]: formData[element]});
        });
      const monthsToYears: string[] = [
          'workExperience',
          'unemployedFor'
        ];
      monthsToYears.forEach(element => {
            form.controls[element].patchValue({
                [element + 'Years']: (formData[element] - (formData[element] % 12)) / 12,
                [element + 'Months']: formData[element] % 12,
              });
        });

      formData.messengers.forEach(element => {
        for (const el in Messengers) {
          if (element.messenger === el) {
            form.controls.messengers.patchValue({
              [el]: element.info
            });
          }
        }
      });
      formData.languageSkills.forEach(element => {
        for (const el in Languages) {
          if (element.language === el) {
            form.controls.languages.patchValue({
              [el]: true
            });
          }
        }
      });
      formData.languageSkills.forEach(element => {
        for (const el in Languages) {
          if (element.language === el) {
            form.controls.languageProficiency.patchValue({
              [el + 'Proficiency']: element.languageProficiency
            });
          }
        }
      });
      formData.professions.forEach(element => {
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
      form.patchValue({
        sex: 'male',
        education: 'primary'
      });
      form.controls.languageProficiency.patchValue({
        englishProficiency: 'basic',
        russianProficiency: 'basic'
      });
    }
  }

  resetFilter(filter: FormGroup) {
    filter.reset();
    filter.patchValue({
      sex: 'male',
      education: 'primary'
    });
  }
}
