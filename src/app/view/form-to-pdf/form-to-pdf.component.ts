import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Form } from '../../shared/interfaces/form';
import {
  Professions,
  Messengers,
  Languages,
  LanguageProficiency,
} from '../../shared/consts/form.enum';

import { FetchService } from '../../core/services/fetch.service';
import { FormService } from '../../shared/services/form.service';
import { PdfService } from '../../core/services/pdf.service';
import { PatchService } from 'src/app/core/services/patch.service';

@Component({
  selector: 'app-form-to-pdf',
  templateUrl: './form-to-pdf.component.html',
  styleUrls: ['./form-to-pdf.component.scss'],
  providers: [FetchService, PatchService],
  encapsulation: ViewEncapsulation.None,
})
export class FormToPdfComponent implements OnInit{
  forms: Form[] = [];
  isAdmin: boolean = localStorage.getItem('role') === 'admin';
  update: boolean = false;
  id: number | undefined;
  output: { id: number | undefined; formData?: Form };
  emailChecked: boolean = false;
  sexChecked: boolean = false;
  prefferedRegionChecked: boolean = false;
  phoneNumberChecked: boolean = false;
  educationChecked: boolean = false;
  bornChecked: boolean = false;
  submittedChecked: boolean = false;
  heightChecked: boolean = false;
  expectedSalaryChecked: boolean = false;
  unemployedForChecked: boolean = false;
  workExperienceChecked: boolean = false;
  noteChecked: boolean = false;
  traineeChecked: boolean = false;
  dealerChecked: boolean = false;
  managerChecked: boolean = false;
  pitBossChecked: boolean = false;
  waiterChecked: boolean = false;
  barmanChecked: boolean = false;
  inspectorChecked: boolean = false;
  englishChecked: boolean = false;
  russianChecked: boolean = false;
  TelegramChecked: boolean = false;
  ViberChecked: boolean = false;
  WhatsAppChecked: boolean = false;
  unemployedForYears: number;
  unemployedForMonths: number;
  workExperienceYears: number;
  workExperienceMonths: number;
  english: LanguageProficiency | undefined;
  russian: LanguageProficiency | undefined;
  Telegram: Messengers | undefined;
  Viber: Messengers | undefined;
  WhatsApp: Messengers | undefined;
  trainee: Professions | undefined;
  dealer: Professions | undefined;
  inspector: Professions | undefined;
  manager: Professions | undefined;
  pit_boss: Professions | undefined;
  waiter: Professions | undefined;
  barman: Professions | undefined;
  middlename: string;


  readonly professions = Professions;
  readonly messengers = Messengers;
  readonly languages = Languages;

  @ViewChild('header', {static: false}) header: ElementRef
  @ViewChild('emailTitle', {static: false}) emailTitle: ElementRef
  @ViewChild('sexTitle', {static: false}) sexTitle: ElementRef
  @ViewChild('prefferedRegionTitle', {static: false}) prefferedRegionTitle: ElementRef
  @ViewChild('phoneNumberTitle', {static: false}) phoneNumberTitle: ElementRef
  @ViewChild('bornTitle', {static: false}) bornTitle: ElementRef
  @ViewChild('educationTitle', {static: false}) educationTitle: ElementRef
  @ViewChild('submittedTitle', {static: false}) submittedTitle: ElementRef
  @ViewChild('heightTitle', {static: false}) heightTitle: ElementRef
  @ViewChild('expectedSalaryTitle', {static: false}) expectedSalaryTitle: ElementRef
  @ViewChild('noteTitle', {static: false}) noteTitle: ElementRef
  @ViewChild('TelegramTitle', {static: false}) TelegramTitle: ElementRef
  @ViewChild('ViberTitle', {static: false}) ViberTitle: ElementRef
  @ViewChild('WhatsAppTitle', {static: false}) WhatsAppTitle: ElementRef
  @ViewChild('russianTitle', {static: false}) russianTitle: ElementRef
  @ViewChild('englishTitle', {static: false}) englishTitle: ElementRef
  @ViewChild('unemployedForTitle', {static: false}) unemployedForTitle: ElementRef
  @ViewChild('workExperienceTitle', {static: false}) workExperienceTitle: ElementRef
  @ViewChild('traineeTitle', {static: false}) traineeTitle: ElementRef
  @ViewChild('dealerTitle', {static: false}) dealerTitle: ElementRef
  @ViewChild('inspectorTitle', {static: false}) inspectorTitle: ElementRef
  @ViewChild('managerTitle', {static: false}) managerTitle: ElementRef
  @ViewChild('pitBossTitle', {static: false}) pitBossTitle: ElementRef
  @ViewChild('waiterTitle', {static: false}) waiterTitle: ElementRef
  @ViewChild('barmanTitle', {static: false}) barmanTitle: ElementRef


  // readonly textInputs = [  
  //   note
  // ];

  constructor(
    private formService: FormService,
    private pdfService: PdfService,
  ) { }

  openUpdate(){
    if(this.isAdmin)
      this.update = !this.update;
  }

  ngOnInit(): void {
    this.formService.getForms().subscribe((forms) => {
      this.forms = forms;
    });
    this.formService.getId().subscribe((id) => {
      // console.log(this.forms[id])
      this.id = id;
      if(id !== undefined){
        this.output = { id, formData: this.forms[id] }
        this.unemployedForYears = Math.floor(this.forms[id].unemployedFor / 12)
        this.unemployedForMonths = this.forms[id].unemployedFor - this.unemployedForYears*12 
        this.workExperienceYears = Math.floor(this.forms[id].workExperience / 12)
        this.workExperienceMonths = this.forms[id].workExperience - this.workExperienceYears*12 
        this.forms[id].professions.forEach(el => {
          this[el.profession] =  el.profession;
        });
        // console.log(this.trainee);
        this.forms[id].messengers.forEach(el => {
          this[el.messenger] =  el.info;
        });
        this.forms[id].languageSkills.forEach(el => {
          // console.log(el.languageProficiency)
          this[el.language] =  el.languageProficiency;
        });
        this.middlename = this.forms[id].middlename;
      } else {
        this.middlename = '';
        this.output = { id: undefined }
        for (let item in Professions) {
          // console.log(item)
          this[item] = undefined;
        }
        for (let item in Messengers) {
          // console.log(item)
          this[item] = undefined;
        }
        for (let item in Languages) {
          // console.log(item)
          this[item] = undefined;
        }
      };      
    });
  }

  createPDF(){
    this.pdfService.clear()
    const header = this.header.nativeElement.innerText;
    this.pdfService.addHeader(header);
    if(this.emailChecked){
      const title = this.emailTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.forms[this.id].email);
    }
    if(this.sexChecked){
      const title = this.sexTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.forms[this.id].sex);
    }
    if(this.prefferedRegionChecked){
      const title = this.prefferedRegionTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.forms[this.id].prefferedRegion);
    }
    if(this.phoneNumberChecked){
      const title = this.phoneNumberTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.forms[this.id].phoneNumber);
    }
    if(this.educationChecked){
      const title = this.educationTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.forms[this.id].education);
    }
    if(this.bornChecked){
      const title = this.bornTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.forms[this.id].born.substring(0,10));
    }
    if(this.submittedChecked){
      const title = this.submittedTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.forms[this.id].created_at.substring(0,10));
    }
    if(this.heightChecked){
      const title = this.heightTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.forms[this.id].height + '');
    }
    if(this.expectedSalaryChecked){
      const title = this.expectedSalaryTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.forms[this.id].expectedSalary + '');
    }
    // unemployedFor
    // workExperience
    if(this.noteChecked){
      const title = this.noteTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.forms[this.id].note);
    }
    if(this.traineeChecked){
      const title = this.traineeTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.trainee);
    }
    if(this.dealerChecked){
      const title = this.dealerTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.dealer);
    }
    if(this.inspectorChecked){
      const title = this.inspectorTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.inspector);
    }
    if(this.waiterChecked){
      const title = this.waiterTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.waiter);
    }
    if(this.barmanChecked){
      const title = this.barmanTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.barman);
    }
    if(this.managerChecked){
      const title = this.managerTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.manager);
    }
    if(this.TelegramChecked){
      const title = this.TelegramTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.Telegram);
    }
    if(this.ViberChecked){
      const title = this.ViberTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.Viber);
    }
    if(this.WhatsAppChecked){
      const title = this.WhatsAppTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.WhatsApp);
    }
    if(this.russianChecked){
      const title = this.russianTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.russian);
    }
    if(this.englishChecked){
      const title = this.englishTitle.nativeElement.innerText;
      this.pdfService.addField(title, this.english);
    }

  }

  open() {
    this.createPDF();
    this.pdfService.openPDF()
  }

  download() {
    this.createPDF();
    this.pdfService.downloadPDF()
  }

  print() {
    this.createPDF();
    this.pdfService.printPDF();
  }


}