import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AppConfig} from 'src/app/api/appconfig';
import {ConfigService} from 'src/app/services/app.config.service';
import {AuthService} from 'src/app/services/auth.service';
import {PasswordModule} from 'primeng/password';
import {CheckboxModule} from 'primeng/checkbox';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  welcomeMsges: string[] = [
    'We have a city to birth!',
    'UWU',
    'Minecraft the best game ever!'
  ]
  welcomeMsg: string = this.welcomeMsges[0];
  config: AppConfig;
  password:string = '';

  subscription: Subscription;


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
  });

  constructor(private authService: AuthService,
              private router: Router,
              public configService: ConfigService
              ) {
  }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
    this.makeRandomWelcomeMsg()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Выбирает привественное сообщение в форме
  makeRandomWelcomeMsg(): void {
    let index: number = Math.floor(Math.random() * this.welcomeMsges.length);
    this.welcomeMsg = this.welcomeMsges[index];
  }

  // Нажатие на кнопку входа
  enter(): void {
    const user: any = {
      email: this.loginForm?.get('email')?.value,
      password: this.loginForm?.get('password')?.value
    }
    this.authService.login(user).subscribe(
      logged => {
        if (logged) {
          this.router.navigateByUrl('/profile');
        } else {
          this.welcomeMsg = "Wrong login or password"
        }
      }
    )
  }

}
