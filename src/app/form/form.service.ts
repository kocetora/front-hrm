import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormData } from './formData';

@Injectable()
export class FormService {

    constructor(private http: HttpClient) { }

    convertFormData(vals): FormData {
        const formData: FormData = {
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

    addForm(form: FormData): Observable<FormData> {
        console.log(form);
        return this.http.post<FormData>('api/form', form);
    }
}
