import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, mapTo, Observable, of, tap, throwError} from 'rxjs';
import { User } from '../api/User';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = {
        addUser: 'http://194.67.104.19:4800/auth/register',
        check: 'http://194.67.104.19:4800/auth/login',
        refreshTokens: 'http://194.67.104.19:4800/auth/refresh'
    }

    constructor(private httpClient: HttpClient) {
    }


    //Вход по логину и паролю
    login(user: {email, password}): Observable<boolean> {
        let url = this.apiUrl.check + '?email=' + user?.email + '&' + 'password=' + user?.password;
        console.log(url);
        return this.httpClient.get<any>(url)
            .pipe(
                tap(tokens => {
                    console.log(tokens)
                    User.setTokens(tokens)
                }),
                mapTo(true),
                catchError(error => {
                    return of(false);
                })
            )
    }

    //Добавление пользователя при регистрации
    addUser(newUser: object): Observable<any> {
        console.log(newUser)
        return this.httpClient.post<any>(this.apiUrl.addUser, newUser)
            .pipe(
                tap(tokens => {
                    console.log(tokens)
                    User.setTokens(tokens)
                }),
                catchError(this.handleError));
    }

    //Получение новых токенов
    getNewTokens(): Observable<any> {
        let objToSend = {
            refresh_token: User.getRefreshToken()
        }
        // @
        return this.httpClient.put(this.apiUrl.refreshTokens, objToSend)
            .pipe(tap(tokens => {
                    // @ts-ignore
                    User.setTokens(tokens);
                }),
                catchError(this.handleErrorTokens))
    }

    //Загрузка информации о пользователе
    loadUserInfo(): Observable<any> {
        return this.httpClient.get<any>(this.apiUrl.addUser)
            .pipe(
                tap(info => {
                        console.log(info)
                        // User.nickname = info.nickname
                        // User.about = info.about
                        // User.avatar_url = info.avatar_url
                        // User.last_login = info.last_login
                        // User.register_time = info.register_time
                        // User.email = info.email
                    }
                ),
                catchError(this.handleError)
            )
    }

    //Сохранение информации о пользователе
    saveUserInfo(userInfo: object): Observable<any> {
        console.log(userInfo);
        return this.httpClient.put<any>(this.apiUrl.addUser, userInfo)
            .pipe(
                catchError(this.handleError)
            )
    }

    // Отправить почту, чтобы на нее пришло письмо с обновлением
    // requestNewPassword(email: string): Observable<any> {
    //     console.log(email);
    //     return this.httpClient.put<any>(this.apiUrl.forgotPass, email)
    //         .pipe(
    //             catchError(this.handleError)
    //         )
    // }

    //Обработка ошибок
    private handleError(errorResponse: HttpErrorResponse) {
        console.log(errorResponse);
        if (errorResponse.status === 500) {
            alert('Database sleeps')
        }
        if (errorResponse.status === 401) {
            console.log("401 error")
        }
        if (errorResponse.status === 404) {
            //UserTokens.deleteTokens();
        }
        return throwError(errorResponse);
    }

    //Обработчик ошибок для получения токенов
    private handleErrorTokens(errorResponse: HttpErrorResponse) {
        console.log('Error while new tokens error' + errorResponse.status);
        if (errorResponse.status === 404) {
            User.clearTokens()
        }
        return throwError(errorResponse);
    }
}
