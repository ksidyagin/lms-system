import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/service/countryservice';

@Component({
  selector: 'app-instructor-add-course',
  templateUrl: './instructor-add-course.component.html',
  styleUrls: ['./instructor-add-course.component.scss']
})
export class InstructorAddCourseComponent implements OnInit {

  // хлебные крошки
  breadcrumbItems: MenuItem[];

  // дропдаун
  selectedDrop: SelectItem;
  cities: SelectItem[];

  // мультиселект теги
  countries: any[];
  selectedMulti: string[] = [];

  // редактор текста
  description: String;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getCountries().then(countries => {
      this.countries = countries;
    });

    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Add course' });

    this.cities = [
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
      { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
      { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
    ];
  }
}
