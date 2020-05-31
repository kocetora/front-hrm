import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ViewService } from './view.service';
import { Form } from './form';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [ViewService]
})
export class ViewComponent implements OnInit {
  forms: Form[] = []
  form: FormGroup
  currentFormId: number

  constructor(private ViewService: ViewService, private http: HttpClient) { }

  ngOnInit(): void {
    
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
    this.getForms();
  }

  

  getForms(): void {
    this.ViewService.getForms().subscribe(forms => {
      this.forms = forms;
      if(this.form[1]){
        this.showForm(1);
        this.currentFormId = 1;
      }
    })
  }
  
  selectForm(i?: any){
    if(this.forms[i]){
      this.showForm(i)
    }
  }
  
  showForm(id?: any){
    console.log(this.forms[id])
    this.currentFormId = this.forms[id].formid
    this.form.patchValue({
      name: this.forms[id].name,
      surname: this.forms[id].surname,
      sex: this.forms[id].sex,
      born: this.forms[id].born,
      height: this.forms[id].height,
      phoneNumber: this.forms[id].phoneNumber,
      email: this.forms[id].email,
      education: this.forms[id].education,
      prefferedRegion: this.forms[id].prefferedRegion,
      note: this.forms[id].surname,  
      expectedSalary: this.forms[id].expectedSalary,
    });
    this.form.controls.workExperience.patchValue({
      workExperienceYears: (this.forms[id].workExperience - (this.forms[id].workExperience % 12))/12,
      workExperienceMonths: this.forms[id].workExperience % 12,
    });
    this.form.controls.unemployedFor.patchValue({
      unemployedForYears: (this.forms[id].unemployedFor - (this.forms[id].unemployedFor % 12))/12,
      unemployedForMonths: this.forms[id].unemployedFor % 12,
    });
    this.forms[id].messengers.forEach(element => {
      if(element['messenger'] == "Telegram"){
        this.form.controls.messengers.patchValue({
          msTelegram: true,
          Telegram: element['info']
        })
      } else {
        this.form.controls.messengers.patchValue({
          msTelegram: false,
          Telegram: ''
        })
      }
      if(element['messenger'] == "WhatsApp"){
        this.form.controls.messengers.patchValue({
          msWhatsApp: true,
          WhatsApp: element['info']
        })
      } else {
        this.form.controls.messengers.patchValue({
          msWhatsApp: false,
          WhatsApp: ''
        })
      }
      if(element['messenger'] == "Viber"){
        this.form.controls.messengers.patchValue({
          msViber: true,
          Viber: element['info']
        })
      } else {
        this.form.controls.messengers.patchValue({
          msViber: false,
          Viber: ''
        })
      }
    });
    this.forms[id].languageSkills.forEach(element => {
      console.log(element)
      if(element['language'] == "russian"){
        this.form.controls.languageSkills.patchValue({
          russian: true,
          russianProficiency: element['languageProficiency']
        })
      } else {
        this.form.controls.languageSkills.patchValue({
          russian: false,
          russianProficiency: 'basic'
        })
      }
      if(element['language'] == "english"){
        this.form.controls.languageSkills.patchValue({
          english: true,
          englishProficiency: element['languageProficiency']
        })
      } else {
        this.form.controls.languageSkills.patchValue({
          english: false,
          englishProficiency: 'basic'
        })
      }
    });
    this.forms[id].professions.forEach(element => {
      if(element['profession'] == "trainee"){
        this.form.controls.professions.patchValue({
          trainee: true,
        })
      } else {
        this.form.controls.professions.patchValue({
          trainee: false,
        })
      }
      if(element['profession'] == "dealer"){
        this.form.controls.professions.patchValue({
          dealer: true,
        })
      } else {
        this.form.controls.professions.patchValue({
          dealer: false,
        })
      }
      if(element['profession'] == "inspector"){
        this.form.controls.professions.patchValue({
          inspector: true,
        })
      } else {
        this.form.controls.professions.patchValue({
          inspector: false,
        })
      }
      if(element['profession'] == "manager"){
        this.form.controls.professions.patchValue({
          manager: true,
        })
      } else {
        this.form.controls.professions.patchValue({
          manager: false,
        })
      }
      if(element['profession'] == "pit_boss"){
        this.form.controls.professions.patchValue({
          pit_boss: true,
        })
      } else {
        this.form.controls.professions.patchValue({
          pit_boss: false,
        })
      }
      if(element['profession'] == "waiter"){
        this.form.controls.professions.patchValue({
          waiter: true,
        })
      } else {
        this.form.controls.professions.patchValue({
          waiter: false,
        })
      }
      if(element['profession'] == "barman"){
        this.form.controls.professions.patchValue({
          barman: true,
        })
      } else {
        this.form.controls.professions.patchValue({
          barman: false,
        })
      }
    });
  }

      submit() {
      if (this.form.valid) {
        const vals = {...this.form.value}
        console.log(vals);
        const formData: Form = {
          formid: this.currentFormId,
          name: vals.name as string,
          surname: vals.surname as string,
          sex: vals.sex as string,
          born: vals.born as string,
          height: Number.parseInt(vals.height),
          phoneNumber: vals.phoneNumber as string,
          email: vals.email as string,
          education: vals.education as string,
          prefferedRegion: vals.prefferedRegion as string,
          expectedSalary: Number.parseInt(vals.expectedSalary),
          workExperience: Number.parseInt(vals.workExperience.workExperienceYears)*12 + 
          Number.parseInt(vals.workExperience.workExperienceMonths),
          unemployedFor: Number.parseInt(vals.unemployedFor.unemployedForYears)*12 + 
          Number.parseInt(vals.unemployedFor.unemployedForMonths),
          note: vals.note as string,
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
        console.log('Form Data:', JSON.stringify(formData, null, 2))

        this.ViewService.updateForm(formData).subscribe(res=>console.log(res))
        this.form.reset()
      }
    }

  delete(id: number): void {
    this.ViewService
        .deleteForm(id)
        .subscribe(() => console.log('Form Deleted'))
  }
  
  deleteItem(id?: any){
    console.log(id);
    this.delete(id);
    this.getForms();
    this.showForm(1);
  }
}
