import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/service/countryservice';

@Component({
  selector: 'app-instructor-edit-quiz',
  templateUrl: './instructor-edit-quiz.component.html',
  styleUrls: ['./instructor-edit-quiz.component.scss']
})
export class InstructorEditQuizComponent implements OnInit {

  // хлебные крошки
  breadcrumbItems: MenuItem[];

  // дропдаун
  selectedDrop: SelectItem;
  cities: SelectItem[];

  // мультиселект теги
  countries1: any[];
  selectedMulti1: string[] = [];
  countries2: any[];
  selectedMulti2: string[] = [];

  // редактор текста
  description: String;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getCountries().then(countries => {
      this.countries1 = countries;
      this.countries2 = countries;
    });

    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Edit quiz' });

    this.cities = [
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
      { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
      { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
    ];
  }

}
