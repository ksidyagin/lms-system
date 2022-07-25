import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from 'src/app/api/product';
import { ProductService } from 'src/app/service/productservice';

@Component({
  selector: 'app-path-details',
  templateUrl: './path-details.component.html',
  styleUrls: ['./path-details.component.scss']
})
export class PathDetailsComponent implements OnInit {
  items: MenuItem[];
  products:Product[];
  levels: any[];
  activeIndex: number = 1;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().then(data => this.products = data);
      this.items = [
      {
        label: 'Новичок',
        command: (event: any) => {
            this.activeIndex = 0;
        }
      },
      {
          label: 'Начинающий',
          command: (event: any) => {
              this.activeIndex = 1;
          }
      },
      {
          label: 'Средний',
          command: (event: any) => {
              this.activeIndex = 2;
          }
      },
      {
          label: 'Продвинутый',
          command: (event: any) => {
              this.activeIndex = 3;
          }
      }
    ];
    this.levels = [
      {
        name: "Начинающий",
        place: "1",
      },
      {
        name: "Средний",
        place: "2",
      },
      {
        name: "Продвинутый",
        place: "3",
      }
    ];

  }

}
