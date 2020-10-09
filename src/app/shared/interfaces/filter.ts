import { LanguageSkill } from './languageSkill';
import { Profession } from './profession';
import { Messenger } from './messenger';

export interface Filter {
  sex: string;
  education: string;
  age: Range[];
  workExperience: Range[];
  height: Range[];
  expectedSalary: Range[];
  languageSkills: LanguageSkill[];
  professions: Profession[];
  messengers: Messenger[];
}

interface Range {
  from: number;
  to: number;
}
