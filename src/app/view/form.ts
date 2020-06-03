export interface Form {
    formid?: number;
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
}

interface LanguageSkill {
    language: string;
    languageProficiency: string;
}

interface Profession {
    profession: string;
}

interface Messenger {
    messenger: string;
    info: string;
}
