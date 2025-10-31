import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface FilterOptions {
  namerepo: string;
  languages: string[];
  sortBy: 'asc' | 'desc' | '';
  order: 'asc' | 'desc' | '';
}

@Component({
  selector: 'app-filters',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class Filters {
  filterForm: FormGroup = new FormGroup({
    reponame: new FormControl(''),
    sortBy: new FormControl(''),
    order: new FormControl(''),
  });

  @Input() languages: string[] = [];
  @Output() filterChange = new EventEmitter<FilterOptions>();

  selectedLangs: string[] = [];

  constructor() {
    this.filterForm.valueChanges.subscribe(() => {
      this.onChangeEmit();
    });
  }

  toggleLanguage(lang: string) {
    const index = this.selectedLangs.indexOf(lang);
    if (index > -1) {
      this.selectedLangs.splice(index, 1);
    } else {
      this.selectedLangs.push(lang);
    }

    this.onChangeEmit();
  }

  cleanFilters() {
    this.filterForm.reset({
      reponame: '',
      sortBy: '',
      order: '',
    });

    this.selectedLangs = [];
    this.onChangeEmit();
  }

  onChangeEmit() {
    this.filterChange.emit({
      namerepo: this.filterForm.value.reponame,
      languages: this.selectedLangs,
      sortBy: this.filterForm.value.sortBy,
      order: this.filterForm.value.order,
    });
  }
}
