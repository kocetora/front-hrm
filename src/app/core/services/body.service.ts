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
      name: vals.name,
      surname: vals.surname,
      middlename: vals.middlename,
      sex: vals.sex,
      born: vals.born,
      phoneNumber: vals.phoneNumber,
      email: vals.email,
      education: vals.education,
      prefferedRegion: vals.prefferedRegion,
      note: vals.note,
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
      isPublic: vals.isPublic,
      images: [],
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

    for (const el in vals.images) {
      if (vals.images[el]) {
        formData.images.push({
          primary: vals.images[el].primary,
          avatar: vals.images[el].avatar,
        });
      }
    }

    return formData;
  }

  convertFilterData(vals): Filter {
    const filterData: Filter = {
      professions: [],
      messengers: [],
      languageSkills: [],
    };

    if (vals.sex) {
      filterData.sex = vals.sex
    } 

    if (vals.education) {
      filterData.education = vals.education
    }
    
    if (vals.submitted) {
      filterData.submitted = vals.submitted
    }

    if (vals.age.ageFrom || vals.age.ageTo) {
      filterData.age = [{ from: vals.age.ageFrom, to: vals.age.ageTo }]
      if (!vals.age.ageFrom) {
        filterData.age[0].from = 0;
      }
      if (!vals.age.ageTo) {
        filterData.age[0].to = 2147483647;
      }
    }
    
    if (vals.height.heightFrom || vals.height.heightTo) {
      filterData.height = [{ from: vals.height.heightFrom, to: vals.height.heightTo }]
      if (!vals.height.heightFrom) {
        filterData.height[0].from = 0;
      }
      if (!vals.height.heightTo) {
        filterData.height[0].to = 2147483647
      }
    }

    filterData.workExperience = vals.workExperience.workExperienceYears * 12 +
          vals.workExperience.workExperienceMonths;

    for (const el in Languages) {
      if (vals.languages[el]) {
        filterData.languageSkills.push({
          language: el,
          languageProficiency: vals.languageProficiency[el + 'Proficiency'],
        });
      }
    }

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
