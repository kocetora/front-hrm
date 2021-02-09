import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  Input
} from '@angular/core';
import { Form } from 'src/app/shared/interfaces/form';
import {
  Professions,
  Messengers,
  Languages,
  LanguageProficiency,
} from 'src/app/shared/consts/form.enum';
import { PdfService } from 'src/app/core/services/pdf.service';

@Component({
  selector: 'app-form-to-pdf',
  templateUrl: './form-to-pdf.component.html',
  styleUrls: ['./form-to-pdf.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormToPdfComponent {
  @Input() form: Form;
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
  currentPicture: string = '';
  readonly fields: string[] = [
    'email',
    'sex',
    'prefferedRegion',
    'phoneNumber',
    'education',
    'note',
  ];
  readonly dateFields: string[] = ['born', 'submitted'];
  readonly numberFields: string[] = ['expectedSalary', 'height'];
  readonly professions = Professions;
  readonly messengers = Messengers;
  readonly languages = Languages;
  readonly arrays = [this.professions, this.messengers, this.languages];

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
    private pdfService: PdfService
  ) {}

  ngOnChanges(form) {
    this.form = form.form.currentValue
      if (this.form) {
        this.unemployedForYears = Math.floor(this.form.unemployedFor / 12);
        this.unemployedForMonths =
          this.form.unemployedFor - this.unemployedForYears * 12;
        this.workExperienceYears = Math.floor(
          this.form.workExperience / 12
        );
        this.workExperienceMonths =
          this.form.workExperience - this.workExperienceYears * 12;
        this.form.professions.forEach((el) => {
          this[el.profession] = el.profession;
        });
        this.form.messengers.forEach((el) => {
          this[el.messenger] = el.info;
        });
        this.form.languageSkills.forEach((el) => {
          this[el.language] = el.languageProficiency;
        });
        this.middlename = this.form.middlename;
        this.born = this.form.born.substring(0, 10);
        this.submitted = this.form.created_at.substring(0, 10);
        if(this.form.images[0]){
          this.currentPicture = this.form.images[0].avatar 
        } else {
          this.currentPicture = '';
        }
        this.form.images.forEach(el => {
          if(el.primary){
            this.currentPicture = el.avatar;
          }
        });
      } else {
        this.currentPicture = '';
        this.born = undefined;
        this.submitted = undefined;
        this.middlename = '';
        this.arrays.forEach((el) => {
          for (const item in el) {
            this[item] = undefined;
          }
        });
      }
  }

  createPDF() {
    this.pdfService.clear();
    const header = this.header.nativeElement.innerText;
    this.pdfService.addImage(this.currentPicture);
    this.pdfService.addHeader(header);
    this.fields.forEach((item) => {
      if (this[item + 'Checked']) {
        const title = this[item + 'Title'].nativeElement.innerText;
        this.pdfService.addField(title, this.form[item]);
      }
    });
    this.dateFields.forEach((item) => {
      if (this[item + 'Checked']) {
        const title = this[item + 'Title'].nativeElement.innerText;
        this.pdfService.addField(title, this[item]);
      }
    });
    this.numberFields.forEach((item) => {
      if (this[item + 'Checked']) {
        const title = this[item + 'Title'].nativeElement.innerText;
        this.pdfService.addField(title, this.form[item] + '');
      }
    });
    this.arrays.forEach((el) => {
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
