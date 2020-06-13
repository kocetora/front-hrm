import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BodyService } from '../../core/services/body.service';
import { FetchService } from '../../core/services/fetch.service';
import { FormService } from '../../core/services/form.service';
import { Filter } from '../../core/interfaces/filter';
import { Form } from '../../core/interfaces/form';
import { PatchService } from '../../core/services/patch.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [BodyService, FetchService, PatchService]
})
export class FilterComponent implements OnInit {
  filter: FormGroup;
  forms: Form[] = [];

  constructor(
    private bodyService: BodyService,
    private fetchService: FetchService,
    private formService: FormService,
    private patchService: PatchService) { }

  ngOnInit(): void {
    this.filter = new FormGroup({
      sex: new FormControl('male', ),
      height: new FormGroup({
        heightFrom: new FormControl(30, [
          Validators.min(30),
          Validators.max(300),
          Validators.required
        ]),
        heightTo: new FormControl(300, [
          Validators.min(30),
          Validators.max(300),
          Validators.required
        ])
      }),
      age: new FormGroup({
        ageFrom: new FormControl(14, [
          Validators.min(14),
          Validators.max(100),
          Validators.required
        ]),
        ageTo: new FormControl(100, [
          Validators.min(14),
          Validators.max(100),
          Validators.required
        ])
      }),
      workExperienceFrom: new FormGroup({
        workExperienceYearsFrom: new FormControl(0, [
          Validators.min(0),
          Validators.max(100),
          Validators.required
        ]),
        workExperienceMonthsFrom: new FormControl(0, [
          Validators.min(0),
          Validators.max(11),
          Validators.required
        ]),
      }),
      workExperienceTo: new FormGroup({
        workExperienceYearsTo: new FormControl(100, [
          Validators.min(0),
          Validators.max(100),
          Validators.required
        ]),
        workExperienceMonthsTo: new FormControl(11, [
          Validators.min(0),
          Validators.max(11),
          Validators.required
        ]),
      }),
      education: new FormControl('higher'),
      expectedSalary: new FormGroup({
        expectedSalaryFrom: new FormControl(1, [
          Validators.min(1),
          Validators.max(100000),
          Validators.required
        ]),
        expectedSalaryTo: new FormControl(100000, [
          Validators.min(1),
          Validators.max(100000),
          Validators.required
        ]),
      }),
      professions: new FormGroup({
        trainee: new FormControl(),
        dealer: new FormControl(),
        inspector: new FormControl(),
        manager: new FormControl(),
        pit_boss: new FormControl(),
        waiter: new FormControl(),
        barman: new FormControl(),
      }),
      messengers: new FormGroup({
        WhatsApp: new FormControl(),
        Telegram: new FormControl(),
        Viber: new FormControl(),
      }),
      languageSkills: new FormGroup({
        language: new FormControl('russian'),
        languageProficiency: new FormControl('native'),
      }),
    });
  }

  filterSubmit() {
    if (this.filter.valid) {
      const filterData: Filter = this.bodyService.convertFilterData({...this.filter.value});
      this.fetchService.filterForms(filterData).subscribe(forms => {
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
