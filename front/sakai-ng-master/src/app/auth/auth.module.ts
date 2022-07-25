import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPassComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        PasswordModule,
        CheckboxModule,
        FormsModule,
        ButtonModule,
        DropdownModule,
        InputTextModule
    ],
    exports: [
        LoginComponent,
        RegisterComponent,
        ForgotPassComponent
    ]
})
export class AuthModule { }
