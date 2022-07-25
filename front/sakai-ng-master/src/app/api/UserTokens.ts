export abstract class UserTokens {
  static access_token: string = ''
  static refresh_token: string = ''

  // Установки access token
  public static setAccessToken(newAccessToken: string): void {
    UserTokens.access_token = newAccessToken;
    localStorage.setItem('access_token', newAccessToken);
  }

  // Установки куакуыр token
  public static setRefreshToken(newRefreshToken: string): void {
    UserTokens.refresh_token = newRefreshToken;
    localStorage.setItem('refresh_token', newRefreshToken);
  }

  // Получение
  public static getRefreshToken(): string {
    return localStorage.getItem('refresh_token');
  }
  // Получение
  public static getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  // Чистка токенов
  public static deleteTokens(): void {
    UserTokens.access_token = '';
    UserTokens.refresh_token = '';
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  public static log() {
    console.log(`'access_token': '${UserTokens.access_token}', 'refresh_token': '${UserTokens.refresh_token}'`);
  }
}
