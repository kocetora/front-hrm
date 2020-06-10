import { Injectable } from '@angular/core';
import { Form } from '../interfaces/form';
import { Filter } from '../interfaces/filter';

@Injectable()
export class BodyService {

    convertFormData(vals): Form {
        const formData: Form = {
          name: vals.name as string,
          surname: vals.surname as string,
          sex: vals.sex as string,
          born: vals.born as string,
          phoneNumber: vals.phoneNumber as string,
          email: vals.email as string,
          education: vals.education as string,
          prefferedRegion: vals.prefferedRegion as string,
          note: vals.note as string,
          height: Number.parseInt(vals.height, 10),
          expectedSalary: Number.parseInt(vals.expectedSalary, 10),
          workExperience: Number.parseInt(vals.workExperience.workExperienceYears, 10) * 12 +
          Number.parseInt(vals.workExperience.workExperienceMonths, 10),
          unemployedFor: Number.parseInt(vals.unemployedFor.unemployedForYears, 10) * 12 +
          Number.parseInt(vals.unemployedFor.unemployedForMonths, 10),
          languageSkills: [],
          messengers: [],
          professions: []
        };

        const languages: string[] = ['english', 'russian'];
        languages.forEach(element => {
            if (vals.languageSkills[element]) {
                formData.languageSkills.push({language: element, languageProficiency: vals.languageSkills[element + 'Proficiency']});
            }
        });

        const professions: string[] = [
            'trainee',
            'dealer',
            'inspector',
            'manager',
            'pit_boss',
            'waiter',
            'barman'
        ];
        professions.forEach(element => {
            if (vals.professions[element]) {
                formData.professions.push({profession: element});
            }
        });

        const messengers: string[] = [
            'Telegram',
            'Viber',
            'WhatsApp'
        ];
        messengers.forEach(element => {
            if (vals.messengers['ms' + element]) {
                formData.messengers.push({messenger: element, info: vals.messengers[element]});
              }
        });

        return formData;
    }

    convertFilterData(vals): Filter {

        const filterData: Filter = {
            sex: vals.sex as string,
            education: vals.education as string,
            age: [{from: vals.age.ageFrom, to: vals.age.ageTo }],
            workExperience: [{from: vals.workExperienceFrom.workExperienceYearsFrom * 12 + vals.workExperienceFrom.workExperienceMonthsFrom,
                              to: vals.workExperienceTo.workExperienceYearsTo * 12 + vals.workExperienceTo.workExperienceMonthsTo}],
            height: [{from: vals.height.heightFrom, to: vals.height.heightTo}],
            expectedSalary: [{from: vals.expectedSalary.expectedSalaryFrom, to: vals.expectedSalary.expectedSalaryTo}],
            languageSkills: [{language: vals.languageSkills.language, languageProficiency: vals.languageSkills.languageProficiency}],
            professions: [],
            messengers: [],
        };

        const professions: string[] = [
            'trainee',
            'dealer',
            'inspector',
            'manager',
            'pit_boss',
            'waiter',
            'barman'
        ];

        professions.forEach(element => {
            if (vals.professions[element]) {
                filterData.professions.push({profession: element});
              }
        });

        const messengers: string[] = [
            'Telegram',
            'Viber',
            'WhatsApp'
        ];

        messengers.forEach(element => {
            if (vals.messengers[element]) {
                filterData.messengers.push({messenger: element});
              }
        });

        return filterData;
    }
}
