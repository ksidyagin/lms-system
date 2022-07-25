import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from 'src/app/api/product';
import { ProductService } from 'src/app/service/productservice';

@Component({
  selector: 'app-skill-result',
  templateUrl: './skill-result.component.html',
  styleUrls: ['./skill-result.component.scss']
})
export class SkillResultComponent implements OnInit {
  products:Product[];
  items: MenuItem[];
  activeIndex: number = 2;
  responsiveOptions;
  constructor(private productService: ProductService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
    ];
   }

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
  }

}
