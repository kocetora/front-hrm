export interface Form {
    formid?: number;
    name: string;
    surname: string;
    sex: string; // enum
    born: string;
    height: number;
    phoneNumber: string;
    email: string;
    messengers: messenger[]; // interface
    education: string;
    prefferedRegion: string;
    languageSkills: languageSkill[]; // interface
    note: string;
    professions: profession[]; // interface
    unemployedFor: number;
    workExperience: number;
    expectedSalary: number;
}

interface languageSkill {
    language: string;
    languageProficiency: string;
}

interface profession {
    profession: string;
}

interface messenger {
    messenger: string;
    info: string;
}
