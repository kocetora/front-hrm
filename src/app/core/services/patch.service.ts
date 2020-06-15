import { Injectable } from '@angular/core';
import { Form } from '../interfaces/form';
import { FormGroup } from '@angular/forms';

const professions = [
  'trainee',
  'dealer',
  'inspector',
  'manager',
  'pit_boss',
  'waiter',
  'barman'
];

const messengers = [
  'Telegram',
  'Viber',
  'WhatsApp'
];

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
          messengers.forEach(el => {
            if (element.messenger === el) {
              form.controls.messengers.patchValue({
                ['ms' + el]: true,
                [el]: element.info
              });
            }
          });
        });
      formData.languageSkills.forEach(element => {
          ['enlish', 'russian'].forEach(el => {
            if (element.language === el) {
              form.controls.languages.patchValue({
                [el]: true
              });
            }
          });
        });
      formData.languageSkills.forEach(element => {
          ['enlish', 'russian'].forEach(el => {
            if (element.language === el) {
              form.controls.languageProficiency.patchValue({
                [el + 'Proficiency']: element.languageProficiency
              });
            }
          });
        });
      formData.professions.forEach(element => {
          professions.forEach(el => {
            if (element.profession === el) {
              form.controls.professions.patchValue({
                [el]: true,
              });
            }
          });
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
