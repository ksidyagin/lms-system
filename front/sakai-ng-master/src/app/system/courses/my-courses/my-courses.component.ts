import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/productservice';

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

export interface Path {
  id?: string
  name?: string
  count?: number
  image?: string
  desc?: string
}

export interface Achivement {
  id?: string
  date?: string
  courseName?: string
  courseImage?: string
  desc?: string
}

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  products: Product[];

  sortOptions: string[] = [
    'новизне',
    'популярности'
  ];

  sortOrder: number;

  sortField: string;

  courseTime = '6 hours'
  lessonsCount = 12

  pathList: Path[] = [
    {
      name: 'AngularCLI',
      count: 18,
      desc: 'Some description',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
    },
    {
      name: 'AngularCLI',
      count: 18,
      desc: 'Some description',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
    },
    {
      name: 'AngularCLI',
      count: 18,
      desc: 'Some description',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
    },
    {
      name: 'AngularCLI',
      count: 18,
      desc: 'Some description',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
    },
    {
      name: 'AngularCLI',
      count: 18,
      desc: 'Some description',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
    },
    {
      name: 'AngularCLI',
      count: 18,
      desc: 'Some description',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
    },
    {
      name: 'AngularCLI',
      count: 18,
      desc: 'Some description',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
    },
    {
      name: 'AngularCLI',
      count: 18,
      desc: 'Some description',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
    },
    {
      name: 'AngularCLI',
      count: 18,
      desc: 'Some description',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
    },
    {
      name: 'AngularCLI',
      count: 18,
      desc: 'Some description',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
    },
  ]

  achivementList: Achivement[] = [
    {
      date: 'May 20, 2022',
      courseName: 'Course name',
      desc: 'Some achivment',
      courseImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
    },
    {
      date: 'May 20, 2022',
      courseName: 'Course name',
      desc: 'Some achivment',
      courseImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
    },
    {
      date: 'May 20, 2022',
      courseName: 'Course name',
      desc: 'Some achivment',
      courseImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
    },
    {
      date: 'May 20, 2022',
      courseName: 'Course name',
      desc: 'Some achivment',
      courseImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
    },
    
  ]

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().then(data => this.products = data);
  }

}
