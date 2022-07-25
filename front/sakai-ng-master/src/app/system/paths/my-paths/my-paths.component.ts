import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Product } from 'src/app/api/product';
import { ProductService } from 'src/app/service/productservice';

@Component({
  selector: 'app-my-paths',
  templateUrl: './my-paths.component.html',
  styleUrls: ['./my-paths.component.scss']
})
export class MyPathsComponent implements OnInit {
  products:Product[];
  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().then(data => this.products = data);

  }

}
