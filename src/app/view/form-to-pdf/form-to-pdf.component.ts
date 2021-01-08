import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
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
export class FormToPdfComponent implements OnInit {
  forms: Form[] = [];
  isAdmin: boolean = localStorage.getItem('role') === 'admin';
  update = false;
  id: number | undefined;
  output: { id: number | undefined; formData?: Form };
  emailChecked = false;
  sexChecked = false;
  prefferedRegionChecked = false;
  phoneNumberChecked = false;
  educationChecked = false;
  bornChecked = false;
  submittedChecked = false;
  heightChecked = false;
  expectedSalaryChecked = false;
  unemployedForChecked = false;
  workExperienceChecked = false;
  noteChecked = false;
  traineeChecked = false;
  dealerChecked = false;
  managerChecked = false;
  pitBossChecked = false;
  waiterChecked = false;
  barmanChecked = false;
  inspectorChecked = false;
  englishChecked = false;
  russianChecked = false;
  TelegramChecked = false;
  ViberChecked = false;
  WhatsAppChecked = false;
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
  born: string;
  submitted: string;
  readonly fields: string[] = [
    'email',
    'sex',
    'prefferedRegion',
    'phoneNumber',
    'education',
    'note',
  ]
  readonly dateFields: string[] = [
    'born',
    'submitted',
  ]
  readonly numberFields: string[] = [
    'expectedSalary',
    'height',
  ]
  readonly professions = Professions;
  readonly messengers = Messengers;
  readonly languages = Languages;
  readonly arrays = [
    this.professions,
    this.messengers,
    this.languages,
  ]

  @ViewChild('header', { static: false }) header: ElementRef;
  @ViewChild('emailTitle', { static: false }) emailTitle: ElementRef;
  @ViewChild('sexTitle', { static: false }) sexTitle: ElementRef;
  @ViewChild('prefferedRegionTitle', { static: false })
  prefferedRegionTitle: ElementRef;
  @ViewChild('phoneNumberTitle', { static: false })
  phoneNumberTitle: ElementRef;
  @ViewChild('bornTitle', { static: false }) bornTitle: ElementRef;
  @ViewChild('educationTitle', { static: false }) educationTitle: ElementRef;
  @ViewChild('submittedTitle', { static: false }) submittedTitle: ElementRef;
  @ViewChild('heightTitle', { static: false }) heightTitle: ElementRef;
  @ViewChild('expectedSalaryTitle', { static: false })
  expectedSalaryTitle: ElementRef;
  @ViewChild('noteTitle', { static: false }) noteTitle: ElementRef;
  @ViewChild('TelegramTitle', { static: false }) TelegramTitle: ElementRef;
  @ViewChild('ViberTitle', { static: false }) ViberTitle: ElementRef;
  @ViewChild('WhatsAppTitle', { static: false }) WhatsAppTitle: ElementRef;
  @ViewChild('russianTitle', { static: false }) russianTitle: ElementRef;
  @ViewChild('englishTitle', { static: false }) englishTitle: ElementRef;
  @ViewChild('unemployedForTitle', { static: false })
  unemployedForTitle: ElementRef;
  @ViewChild('workExperienceTitle', { static: false })
  workExperienceTitle: ElementRef;
  @ViewChild('traineeTitle', { static: false }) traineeTitle: ElementRef;
  @ViewChild('dealerTitle', { static: false }) dealerTitle: ElementRef;
  @ViewChild('inspectorTitle', { static: false }) inspectorTitle: ElementRef;
  @ViewChild('managerTitle', { static: false }) managerTitle: ElementRef;
  @ViewChild('pitBossTitle', { static: false }) pitBossTitle: ElementRef;
  @ViewChild('waiterTitle', { static: false }) waiterTitle: ElementRef;
  @ViewChild('barmanTitle', { static: false }) barmanTitle: ElementRef;

  constructor(
    private formService: FormService,
    private pdfService: PdfService
  ) {}

  openUpdate() {
    if (this.isAdmin) { this.update = !this.update; }
  }

  ngOnInit(): void {
    this.formService.getForms().subscribe((forms) => {
      this.forms = forms;
    });
    this.formService.getId().subscribe((id) => {
      this.id = id;
      if (id !== undefined) {
        this.output = { id, formData: this.forms[id] };
        this.unemployedForYears = Math.floor(this.forms[id].unemployedFor / 12);
        this.unemployedForMonths =
          this.forms[id].unemployedFor - this.unemployedForYears * 12;
        this.workExperienceYears = Math.floor(
          this.forms[id].workExperience / 12
        );
        this.workExperienceMonths =
          this.forms[id].workExperience - this.workExperienceYears * 12;
        this.forms[id].professions.forEach((el) => {
          this[el.profession] = el.profession;
        });
        this.forms[id].messengers.forEach((el) => {
          this[el.messenger] = el.info;
        });
        this.forms[id].languageSkills.forEach((el) => {
          this[el.language] = el.languageProficiency;
        });
        this.middlename = this.forms[id].middlename;
        this.born = this.forms[this.id].born.substring(0, 10)
        this.submitted = this.forms[this.id].created_at.substring(0, 10)
      } else {
        this.born = undefined
        this.submitted = undefined
        this.middlename = '';
        this.output = { id: undefined };
        this.arrays.forEach(el => {
          for (const item in el) {
            this[item] = undefined;
          }
        });
      }
    });
  }

  createPDF() {
    this.pdfService.clear();
    const header = this.header.nativeElement.innerText;
    this.pdfService.addHeader(header);
    this.fields.forEach(item => {
      if (this[item + 'Checked']) {
        const title = this[item + 'Title'].nativeElement.innerText;
        this.pdfService.addField(title, this.forms[this.id][item]);
      }
    });
    this.dateFields.forEach(item => {
      if (this[item + 'Checked']) {
        const title = this[item + 'Title'].nativeElement.innerText;
        this.pdfService.addField(title, this[item]);
      }
    });
    this.numberFields.forEach(item => {
      if (this[item + 'Checked']) {
        const title = this[item + 'Title'].nativeElement.innerText;
        this.pdfService.addField(title, this.forms[this.id][item] + '');
      }
    });
    this.arrays.forEach(el => {
      for (const item in el) {
        if (this[item + 'Checked']) {
          const title = this[item + 'Title'].nativeElement.innerText;
          this.pdfService.addField(title, this[item]);
        }
      }
    });
  }

  open() {
    this.createPDF();
    this.pdfService.openPDF();
  }

  download() {
    this.createPDF();
    this.pdfService.downloadPDF();
  }

  print() {
    this.createPDF();
    this.pdfService.printPDF();
  }
}
