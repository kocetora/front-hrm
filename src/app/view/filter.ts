export interface Filter {
    sex: string;
    education: string;
    age: Range[];
    workExperience: Range[];
    height: Range[];
    expectedSalary: Range[];
    languageSkills: languageSkill[];
    professions: profession[];
    messengers: messenger[];
}

interface Range {
    from: number;
    to: number;
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
}
