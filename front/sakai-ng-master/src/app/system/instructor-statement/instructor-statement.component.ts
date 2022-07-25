import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Customer, Representative } from 'src/app/api/customer';
import { CustomerService } from 'src/app/service/customerservice';

@Component({
  selector: 'app-instructor-statement',
  templateUrl: './instructor-statement.component.html',
  styleUrls: ['./instructor-statement.component.scss']
})
export class InstructorStatementComponent implements OnInit {

  // хлебные крошки
  breadcrumbItems: MenuItem[];

  // таблица транзакций
  customers1: Customer[];
  representatives: Representative[];
  statuses: any[];
  loading: boolean = true;

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    // хлебные крошки
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Statement' });

    // таблица транзакций
    this.customerService.getCustomersLarge().then(customers => {
      this.customers1 = customers;
      this.loading = false;

      // @ts-ignore
      this.customers1.forEach(customer => customer.date = new Date(customer.date));
    });
  }

}
