import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Product } from 'src/app/api/product';
import { ProductService } from 'src/app/service/productservice';

@Component({
  selector: 'app-browse-paths',
  templateUrl: './browse-paths.component.html',
  styleUrls: ['./browse-paths.component.scss']
})
export class BrowsePathsComponent implements OnInit {
  products: Product[];
  categories: any[];
  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  sourceCities: any[];

  targetCities: any[];

  orderCities: any[];
  value1 = false;
  responsiveOptions;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().then(data => this.products = data);

    this.categories = [
      {
          label: 'Web Development',
          icon: 'pi pi-fw pi-globe'
      },
      {
          label: 'Design',
          icon: 'pi pi-fw pi-palette'
      },
      {
          label: 'IOS',
          icon: 'pi pi-fw pi-apple'
      },
      {
          label: 'Android',
          icon: 'pi pi-fw pi-android'
      },
      {
          label: 'Business',
          icon: 'pi pi-fw pi-briefcase'
      },
      {
          label: 'Photography',
          icon: 'pi pi-fw pi-camera'
      },
      {
        label: 'Marketing',
        icon: 'pi pi-fw pi-chart-line'
      },
      {
        label: 'eCommerce',
        icon: 'pi pi-fw pi-shopping-cart'
      },
      {
        label: 'Health & Fitness',
        icon: 'pi pi-fw pi-heart-fill'
      },
      {
        label: 'Music',
        icon: 'pi pi-fw pi-volume-up'
      },
  ];
  }
  onKeydown(event: KeyboardEvent) {
    const nodeElement = (<HTMLDivElement>event.target);
    if (event.code === 'Enter' || event.code === 'Space') {
        nodeElement.click();
        event.preventDefault();
    }
}

}
