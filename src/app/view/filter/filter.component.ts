import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BodyService } from '../../core/services/body.service';
import { FetchService } from '../../core/services/fetch.service';
import { FormService } from '../../shared/services/form.service';
import { Filter } from '../../shared/interfaces/filter';
import { Form } from '../../shared/interfaces/form';
import { PatchService } from '../../core/services/patch.service';
import {
  Genders,
  Grades,
  Professions,
  Messengers,
  Languages,
  LanguageProficiency,
} from '../../shared/consts/form.enum';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [BodyService, FetchService, PatchService],
})
export class FilterComponent implements OnInit {
  readonly genders = Genders;
  readonly grades = Grades;
  readonly professions = Professions;
  readonly messengers = Messengers;
  readonly languages = Languages;
  readonly languageProficiency = LanguageProficiency;
  filter: any;
  forms: Form[] = [];

  constructor(
    private bodyService: BodyService,
    private fetchService: FetchService,
    private formService: FormService,
    private patchService: PatchService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filter = this.formBuilder.group({
      sex: [],
      height: this.formBuilder.group({
        heightFrom: [,[Validators.min(0), Validators.max(2147483647)]],
        heightTo: [,[Validators.min(0), Validators.max(2147483647)]],
      }),
      age: this.formBuilder.group({
        ageFrom: [,[Validators.min(0), Validators.max(2147483647)]],
        ageTo: [,[Validators.min(0), Validators.max(2147483647)]],
      }),
      workExperience: this.formBuilder.group({
        workExperienceYears: [,[Validators.min(0), Validators.max(100)]],
        workExperienceMonths: [,[Validators.min(0), Validators.max(11)]],
      }),
      education: [],
      expectedSalary: this.formBuilder.group({
        expectedSalaryFrom: [,[Validators.min(0), Validators.max(2147483647)]],
        expectedSalaryTo: [,[Validators.min(0), Validators.max(2147483647)]],
      }),
      professions: this.formBuilder.group(
        {
          trainee: [],
          dealer: [],
          inspector: [],
          manager: [],
          pit_boss: [],
          waiter: [],
          barman: [],
        }),
      messengers: this.formBuilder.group(
        {
          Viber: [],
          Telegram: [],
          WhatsApp: [],
        }),
      languages: this.formBuilder.group(
        {
          english: [],
          russian: [],
        }),
      languageProficiency: this.formBuilder.group({
        englishProficiency: ['native'],
        russianProficiency: ['native'],
      }),
    });
  }

  filterSubmit() {
    if (this.filter.valid) {
      const filterData: Filter = this.bodyService.convertFilterData({
        ...this.filter.value,
      });
      console.log(filterData)
      const request = localStorage.getItem('jwt')
        ? this.fetchService.findForms(filterData)
        : this.fetchService.findPublicForms(filterData);
      request.subscribe((forms) => {
        console.log(forms)
        this.formService.setForms(forms);
        this.formService.setId(undefined);
      }, (err)=>console.log(err));
    }
  }

  filterReset(): void {
    this.patchService.resetFilter(this.filter);
    const filter: Filter = {};
    const request = localStorage.getItem('jwt')
      ? this.fetchService.findForms(filter)
      : this.fetchService.findPublicForms(filter);
    request.subscribe((forms) => {
      this.formService.setForms(forms);
    });
    this.formService.setId(undefined);
  }
}
