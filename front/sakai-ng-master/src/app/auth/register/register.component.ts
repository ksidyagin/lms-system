import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    register_form = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
        fio: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
        is_mentor: new FormControl(false),
    });

    constructor(private authService: AuthService,
                private router: Router) {
    }

    ngOnInit(): void {
    }


    // Нажатие на кнопку регистрации
    enter(): void {
        const user: any = {
            email: this.register_form?.get('email')?.value,
            password: this.register_form?.get('password')?.value,
            fio: this.register_form?.get('fio')?.value,
            is_mentor: this.register_form?.get('is_mentor')?.value[0]
        }
        this.authService.addUser(user).subscribe(
            tokens => {
                this.router.navigateByUrl('/profile');
            },
            error => {
                if (error.status === 0) {
                    alert('Server sleeps')
                } else if (error.status === 500) {
                    alert('Database sleeps')
                } else if (error.status === 400) {
                    alert('ERROR_400')
                } else if (error.status === 409) {
                    alert('User with this login is already exist')
                }
            }
        )
    }

}
