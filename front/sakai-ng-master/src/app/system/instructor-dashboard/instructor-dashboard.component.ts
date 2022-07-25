import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';
import { Customer, Representative } from 'src/app/api/customer';
import { ConfigService } from 'src/app/services/app.config.service';
import { CustomerService } from 'src/app/service/customerservice';
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

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.scss']
})
export class InstructorDashboardComponent implements OnInit {

  // хлебные крошки
  breadcrumbItems: MenuItem[];

  // график
  barData: any;
  barOptions: any;
  config: AppConfig;
  subscription: Subscription;

  // таблица транзакций
  customers1: Customer[];
  representatives: Representative[];
  statuses: any[];
  loading: boolean = true;

  constructor(
    public configService: ConfigService,
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {

    // хлебные крошки
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard' });

    // график
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
      this.updateChartOptions();
    });
    this.barData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#2f4860',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#00bb7e',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
    this.updateChartOptions();

    // таблица транзакций
    this.customerService.getCustomersLarge().then(customers => {
      this.customers1 = customers;
      this.loading = false;

      // @ts-ignore
      this.customers1.forEach(customer => customer.date = new Date(customer.date));
    });
  }

  updateChartOptions() {
    if (this.config.dark)
      this.applyDarkTheme();
    else
      this.applyLightTheme();
  }

  applyLightTheme() {
    this.barOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef',
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef',
          }
        },
      }
    };
  }

  applyDarkTheme() {
    this.barOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)',
          }
        },
        y: {
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)',
          }
        },
      }
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
