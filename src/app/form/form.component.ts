import {Component, OnInit} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    form: FormGroup
    ngOnInit() {
      this.form = new FormGroup({
        name: new FormControl('', [
          Validators.required]),
        surname: new FormControl('', [
          Validators.required]),
        sex: new FormControl('male', ),
        born: new FormControl('', [ //not tomorrow
          Validators.required]),
        height: new FormControl(0, [
          Validators.min(30),
          Validators.max(300) 
        ]),
        phoneNumber: new FormControl('', [
          Validators.required]),
        email: new FormControl('', [
          Validators.email,
          Validators.required]),
        education: new FormControl('higher'),
        prefferedRegion: new FormControl('', [
          Validators.required]),
        expectedSalary: new FormControl(0, [
          Validators.min(1),
        ]),
        unemployedFor: new FormGroup({
          unemployedForYears: new FormControl(0, [
            Validators.min(0),
            Validators.max(100),
          ]),
          unemployedForMonths: new FormControl(0, [
            Validators.min(0),
            Validators.max(11),
          ])
        }),
        workExperience: new FormGroup({
          workExperienceYears: new FormControl(0, [
            Validators.min(0),
            Validators.max(100),
          ]),
          workExperienceMonths: new FormControl(0, [
            Validators.min(0),
            Validators.max(11),
          ]),
        }),
        note: new FormControl(""),
        languageSkills: new FormGroup({
          english: new FormControl(),
          russian: new FormControl(),
          englishProficiency: new FormControl('basic'),
          russianProficiency: new FormControl('basic')
        }),
        professions: new FormGroup({
          trainee: new FormControl( ),
          dealer: new FormControl( ),
          inspector: new FormControl( ),
          manager: new FormControl( ),
          pit_boss: new FormControl( ),
          waiter: new FormControl( ),
          barman: new FormControl( ),
        }),
        messengers: new FormGroup({
          WhatsApp: new FormControl( ),
          Telegram: new FormControl( ),
          Viber: new FormControl( ),
          msWhatsApp: new FormControl( ),
          msTelegram: new FormControl( ),
          msViber: new FormControl( ),
        })
      })
    }
  
    submit() {
      if (this.form.valid) {
        console.log('Form: ', this.form)
        const vals = {...this.form.value}

        const formData = {
          name: vals.name,
          surname: vals.surname,
          sex: vals.sex,
          born: vals.born,
          height: vals.height,
          phoneNumber: vals.phoneNumber,
          email: vals.email,
          education: vals.education,
          prefferedRegion: vals.prefferedRegion,
          expectedSalary: vals.expectedSalary,
          workExperience: Number.parseInt(vals.workExperience.workExperienceYears)*12 + 
          Number.parseInt(vals.workExperience.workExperienceMonths),
          unemployedFor: Number.parseInt(vals.unemployedFor.unemployedForYears)*12 + 
          Number.parseInt(vals.unemployedFor.unemployedForMonths),
          note: vals.note,
          languageSkills: [],
          messengers: [],
          professions: []
        }
        if(vals.languageSkills.english){
          formData.languageSkills.push({language: 'english', languageProficiency: vals.languageSkills.englishProficiency})
        }
        if(vals.languageSkills.russian){
          formData.languageSkills.push({language: 'russian', languageProficiency: vals.languageSkills.russianProficiency})
        }
        if(vals.professions.trainee){
          formData.professions.push({profession: 'trainee'})
        }
        if(vals.professions.dealer){
          formData.professions.push({profession: 'dealer'})
        }
        if(vals.professions.inspector){
          formData.professions.push({profession: 'inspector'})
        }
        if(vals.professions.manager){
          formData.professions.push({profession: 'manager'})
        }
        if(vals.professions.waiter){
          formData.professions.push({profession: 'waiter'})
        }
        if(vals.professions.pit_boss){
          formData.professions.push({profession: 'pit_boss'})
        }
        if(vals.professions.barman){
          formData.professions.push({profession: 'barman'})
        }
        if(vals.messengers.msTelegram){
          formData.messengers.push({messenger: 'Telegram', info: vals.messengers.Telegram})
        }
        if(vals.messengers.msWhatsApp){
          formData.messengers.push({messenger: 'WhatsApp', info: vals.messengers.WhatsApp})
        }
        if(vals.messengers.msViber){
          formData.messengers.push({messenger: 'Viber', info: vals.messengers.Viber})
        }
        console.log('Form Data:', formData)
        // this.form.reset()
      }
    }

  }
