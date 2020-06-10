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

interface LanguageSkill {
    language: string;
    languageProficiency: string;
}

interface Profession {
    profession: string;
}

interface Messenger {
    messenger: string;
}
