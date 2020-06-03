import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from './form';
import { Filter } from './filter';

@Injectable()
export class ViewService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.jwt
        })
      };

    constructor(private http: HttpClient) { }

    convertFilterData(vals): Filter {

        const filterData: Filter = {
            sex: vals.sex as string,
            education: vals.education as string,
            age: [{from: vals.age.ageFrom, to: vals.age.ageFrom }],
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

    getForms(): Observable<Form[]> {
        return this.http.get<Form[]>('api/forms', this.httpOptions);
    }

    deleteForm(id: number): Observable<{}> {
        const url = `api/form/${id}`;
        return this.http.delete(url, this.httpOptions);
    }

    updateForm(form: Form): Observable<{}> {
        const url = `api/form/${form.formid}`;
        return this.http.put<Form>(url, form, this.httpOptions);
    }

    filterForm(filter: Filter): Observable<{}> {
        const url = `api/form/filter`;
        return this.http.post<Filter>(url, filter, this.httpOptions);
    }
}
