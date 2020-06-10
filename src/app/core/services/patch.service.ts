import { Injectable } from '@angular/core';
import { Form } from '../interfaces/form';
import { FormGroup } from '@angular/forms';

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
            [
              'Telegram',
              'Viber',
              'WhatsApp'
            ].forEach(el => {
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
            ['trainee',
            'dealer',
            'inspector',
            'manager',
            'pit_boss',
            'waiter',
            'barman'].forEach(el => {
              if (element.profession === el) {
                form.controls.professions.patchValue({
                  [el]: true,
                });
              }
            });
          });
    }
}
