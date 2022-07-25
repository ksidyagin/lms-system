import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AppConfig} from '../api/appconfig';

@Injectable()
export class ConfigService {

  config: AppConfig = {
    theme: 'lara-light-indigo',
    dark: false,
    inputStyle: 'outlined',
    ripple: true,
    urls: {
      neimark: 'http://neimark-it.ru/',
      neimark_news: 'http://neimark-it.ru/lektorii',
      discord: 'https://discord.gg/39bBNWeq'
    },
  };

  private configUpdate = new Subject<AppConfig>();

  configUpdate$ = this.configUpdate.asObservable();

  updateConfig(config: AppConfig) {
    this.config = config;
    this.configUpdate.next(config);
  }

  getConfig() {
    return this.config;
  }
}
