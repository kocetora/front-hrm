import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BodyService } from '../../core/services/body.service';
import { FetchService } from '../../core/services/fetch.service';
import { FormService } from '../../shared/services/form.service';
import { Filter } from '../../shared/interfaces/filter';
import { Form } from '../../shared/interfaces/form';
import { PatchService } from '../../core/services/patch.service';
import { atLeastOne } from '../../shared/validators/atLeastOne';
import { FormEnums } from '../../shared/consts/form.enum';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [BodyService, FetchService, PatchService]
})
export class FilterComponent implements OnInit {

  readonly genders = FormEnums.Genders;
  readonly grades = FormEnums.Grades;
  readonly professions = FormEnums.Professions;
  readonly messengers = FormEnums.Messengers;
  readonly languages = FormEnums.Languages;
  readonly languageProficiency = FormEnums.LanguageProficiency;
  filter: any;
  forms: Form[] = [];

  constructor(
    private bodyService: BodyService,
    private fetchService: FetchService,
    private formService: FormService,
    private patchService: PatchService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.filter = this.formBuilder.group({
      sex: ['male', Validators.required],
      height: this.formBuilder.group({
        heightFrom: ['', [Validators.required, Validators.min(30), Validators.max(300)]],
        heightTo: ['', [Validators.required, Validators.min(30), Validators.max(300)]]
      }),
      age: this.formBuilder.group({
        ageFrom: ['', [Validators.required, Validators.min(14), Validators.max(100)]],
        ageTo: ['', [Validators.required, Validators.min(14), Validators.max(100)]]
      }),
      workExperienceFrom: this.formBuilder.group({
        workExperienceYearsFrom: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
        workExperienceMonthsFrom: ['', [Validators.required, Validators.min(0), Validators.max(11)]]
      }),
      workExperienceTo: this.formBuilder.group({
        workExperienceYearsTo: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
        workExperienceMonthsTo: ['', [Validators.required, Validators.min(0), Validators.max(11)]]
      }),
      education: ['higher', Validators.required],
      expectedSalary: this.formBuilder.group({
        expectedSalaryFrom: ['', [Validators.required, Validators.min(1), Validators.max(100000)]],
        expectedSalaryTo: ['', [Validators.required, Validators.min(1), Validators.max(100000)]]
      }),
      professions: this.formBuilder.group({
        trainee: [],
        dealer: [],
        inspector: [],
        manager: [],
        pit_boss: [],
        waiter: [],
        barman: [],
      }, { validator: atLeastOne(Validators.required) }),
      messengers: this.formBuilder.group({
        Viber: [],
        Telegram: [],
        WhatsApp: [],
      }, { validator: atLeastOne(Validators.required) }),
      languageSkills: this.formBuilder.group({
        language: ['english', Validators.required],
        languageProficiency: ['fluent', Validators.required]
      })
    });
  }

  filterSubmit() {
    if (this.filter.valid) {
      const filterData: Filter = this.bodyService.convertFilterData({...this.filter.value});
      this.fetchService.filterForms(filterData).subscribe(forms => {
        console.log(forms);
        this.formService.setForms(forms);
        this.formService.setId(undefined);
      });
    }
  }

  filterReset(): void {
    this.patchService.resetFilter(this.filter);
    this.fetchService.getForms().subscribe(forms => {
      this.formService.setForms(forms);
    });
    this.formService.setId(undefined);
  }
}
