export interface FormData {
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
    note: string
    languageSkills: Object[] //interface
    professions: Object[] //interface
    unemployedFor: number
    workExperience: number
    expectedSalary: number
}