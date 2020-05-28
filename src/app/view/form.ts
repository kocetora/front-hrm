export interface Form{
    name: string
    surname: string 
    sex: string //enum
    born: string
    height: number
    phoneNumber: string
    email: string
    messengers: Object[] //interface
    education: string
    prefferedRegion: string
    languageSkills: Object[] //interface
    note: string
    professions: Object[] //interface
    unemployedFor: number
    workExperience: number
    expectedSalary: number
}