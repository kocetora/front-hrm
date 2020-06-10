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

  patchData(id: number, form: FormGroup, forms: Form[]) {
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
          form.patchValue({[element]: forms[id][element]});
        });
      const monthsToYears: string[] = [
          'workExperience',
          'unemployedFor'
        ];
      monthsToYears.forEach(element => {
            form.controls[element].patchValue({
                [element + 'Years']: (forms[id][element] - (forms[id][element] % 12)) / 12,
                [element + 'Months']: forms[id][element] % 12,
              });
        });
      forms[id].messengers.forEach(element => {
          messengers.forEach(el => {
            if (element.messenger === el) {
              form.controls.messengers.patchValue({
                ['ms' + el]: true,
                [el]: element.info
              });
            }
          });
        });
      forms[id].languageSkills.forEach(element => {
          ['enlish', 'russian'].forEach(el => {
            if (element.language === el) {
              form.controls.languageSkills.patchValue({
                [el]: true,
                [el + 'Proficiency']: element.languageProficiency
              });
            }
          });
        });
      forms[id].professions.forEach(element => {
          professions.forEach(el => {
            if (element.profession === el) {
              form.controls.professions.patchValue({
                [el]: true,
              });
            }
          });
        });
  }

  resetFilter(filter: FormGroup) {
    filter.patchValue({
      sex: 'male',
      education: 'higher'
    });
    professions.forEach(el => {
        filter.controls.professions.patchValue({
        [el]: false
      });
    });
    messengers.forEach(el => {
        filter.controls.messengers.patchValue({
        [el]: false
      });
    });
    filter.controls.languageSkills.patchValue({
      language: 'russian',
      languageProficiency: 'native'
    });
    filter.controls.expectedSalary.patchValue({
      expectedSalaryFrom: 1,
      expectedSalaryTo: 100000
    });
    filter.controls.age.patchValue({
      ageFrom: 14,
      ageTo: 100
    });
    filter.controls.height.patchValue({
      heightFrom: 30,
      heightTo: 300
    });
    filter.controls.workExperienceFrom.patchValue({
      workExperienceYearsFrom: 0,
      workExperienceMonthsFrom: 0
    });
    filter.controls.workExperienceTo.patchValue({
      workExperienceYearsTo: 100,
      workExperienceMonthsTo: 11
    });
  }
}
