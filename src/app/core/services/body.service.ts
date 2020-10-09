import { Injectable } from '@angular/core';
import { Form } from '../../shared/interfaces/form';
import { Filter } from '../../shared/interfaces/filter';
import {
  Professions,
  Messengers,
  Languages,
  LanguageProficiency,
} from '../../shared/consts/form.enum';
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
      workExperience:
        Number.parseInt(vals.workExperience.workExperienceYears, 10) * 12 +
        Number.parseInt(vals.workExperience.workExperienceMonths, 10),
      unemployedFor:
        Number.parseInt(vals.unemployedFor.unemployedForYears, 10) * 12 +
        Number.parseInt(vals.unemployedFor.unemployedForMonths, 10),
      languageSkills: [],
      messengers: [],
      professions: [],
    };

    for (const el in Languages) {
      if (vals.languages[el]) {
        formData.languageSkills.push({
          language: el,
          languageProficiency: vals.languageProficiency[el + 'Proficiency'],
        });
      }
    }

    for (const el in Professions) {
      if (vals.professions[el]) {
        formData.professions.push({ profession: el });
      }
    }

    for (const el in Messengers) {
      if (vals.messengers[el]) {
        formData.messengers.push({ messenger: el, info: vals.messengers[el] });
      }
    }

    return formData;
  }

  convertFilterData(vals): Filter {
    const filterData: Filter = {
      sex: vals.sex as string,
      education: vals.education as string,
      age: [{ from: vals.age.ageFrom, to: vals.age.ageTo }],
      workExperience: [
        {
          from:
            vals.workExperienceFrom.workExperienceYearsFrom * 12 +
            vals.workExperienceFrom.workExperienceMonthsFrom,
          to:
            vals.workExperienceTo.workExperienceYearsTo * 12 +
            vals.workExperienceTo.workExperienceMonthsTo,
        },
      ],
      height: [{ from: vals.height.heightFrom, to: vals.height.heightTo }],
      expectedSalary: [
        {
          from: vals.expectedSalary.expectedSalaryFrom,
          to: vals.expectedSalary.expectedSalaryTo,
        },
      ],
      languageSkills: [
        {
          language: vals.languageSkills.language,
          languageProficiency: vals.languageSkills.languageProficiency,
        },
      ],
      professions: [],
      messengers: [],
    };

    for (const el in Professions) {
      if (vals.professions[el]) {
        filterData.professions.push({ profession: el });
      }
    }

    for (const el in Messengers) {
      if (vals.messengers[el]) {
        filterData.messengers.push({ messenger: el });
      }
    }

    return filterData;
  }
}
