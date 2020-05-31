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
      }
    })
  }
  
  selectForm(id?: any){
    if(this.forms[id]){
      this.showForm(id)
    }
  }
  
  showForm(id?: any){
    this.form.patchValue({
      name: this.forms[id].name,
      surname: this.forms[id].surname
    });
  }

  delete(id: number): void {
    this.ViewService
        .deleteForm(id)
        .subscribe(() => console.log('Form Deleted'))
}
  
  deleteItem(id?: any){
    console.log(id);
    this.delete(id)
    this.getForms();
    this.showForm(1);
  }


  
  // edit (torm) {
  //     this.editTorm = torm
  // }
  
  // update () {
  //     if (this.editTorm) {
  //         this.tormService.updateTorm(this.editTorm).subscribe(() => {
  //             this.getTorms()
  //         })
  //         this.editTorm = undefined
  //     }
  // }

}
