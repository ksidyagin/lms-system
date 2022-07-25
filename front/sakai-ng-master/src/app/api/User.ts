import {UserTokens} from "./UserTokens";
import {StandartFields} from "./StandartFields";

export abstract class User extends StandartFields {
    public static login?: string
    public static password?: string //32
    public static nickname?: string //32
    public static about?: string
    public static email?: string
    public static register_time?: string
    public static last_login?: string
    public static avatar_url?: string

    // Установка новых токенов
    public static setTokens(tokens: {access_token, refresh_token}): void {
        UserTokens.setAccessToken(tokens.access_token);
        UserTokens.setRefreshToken(tokens.refresh_token);
    }

    // Перезапись токенов
    public static setAccessToken(newAccessToken: string): void {
        UserTokens.setAccessToken(newAccessToken);
    }

    public static setRefreshToken(newRefreshToken: string): void {
        UserTokens.setRefreshToken(newRefreshToken);
    }

    //Получение токенов
    public static getAccessToken(): string {
      return UserTokens.getAccessToken()
    }

    public static getRefreshToken(): string {
        return UserTokens.getRefreshToken()
    }

    // Чистка токенов
    public static clearTokens(): void {
        UserTokens.deleteTokens()
    }

    // Дает весь обьект как строку
    public toString(): string {
        const keys = Object.getOwnPropertyNames(this)
        const values = keys.map(key => `${key}: ${Reflect.get(this, key)?.toString()}`)

        let result = "";
        let index: number = 0
        do {
            result += values[index++] + ', '
        } while (index < values.length - 1)
        result += values[index]

        return result;
    }
}
