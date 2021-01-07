import { LanguageSkill } from './languageSkill';
import { Profession } from './profession';
import { Messenger } from './messenger';

export interface Form {
  id?: number;
  name: string;
  surname: string;
  sex: string;
  born: string;
  height: number;
  phoneNumber: string;
  email: string;
  messengers: Messenger[];
  education: string;
  prefferedRegion: string;
  languageSkills: LanguageSkill[];
  note: string;
  professions: Profession[];
  unemployedFor: number;
  workExperience: number;
  expectedSalary: number;
  isPublic: boolean;
}
