import { LanguageSkill } from './languageSkill';
import { Profession } from './profession';
import { Messenger } from './messenger';
import { Images } from './images';

export interface Form {
  id?: number;
  name: string;
  surname: string;
  middlename?: string;
  sex: string;
  born: string;
  height: number;
  phoneNumber: string;
  email: string;
  messengers: Messenger[];
  education: string;
  prefferedRegion?: string;
  languageSkills: LanguageSkill[];
  note?: string;
  professions: Profession[];
  unemployedFor: number;
  workExperience: number;
  expectedSalary: number;
  isPublic: boolean;
  created_at?: string;
  images: Images[];
}
