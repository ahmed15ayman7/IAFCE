import { jwtDecode } from 'jwt-decode';
import { authApi } from '@/lib/api';
import { setTokens, getAccessToken, getRefreshToken, removeTokens,redirectToLogin } from './server-cookie.service';

interface TokenPayload {
  exp: number;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

class AuthService {
  private static instance: AuthService;
  private refreshTokenTimeout?: NodeJS.Timeout;
  private accessToken: string = '';
  private refresh_token: string = '';

  private constructor() { }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // تعيين التوكن عند تسجيل الدخول
  public async setTokens(accessToken: string, refreshToken: string) {
    if (!accessToken || !refreshToken) {
      console.error('Invalid tokens provided');
      return;
    }

    this.accessToken = accessToken;
    this.refresh_token = refreshToken;
    await setTokens(accessToken, refreshToken);

    try {
      this.startRefreshTokenTimer();
    } catch (error) {
      console.error('Error setting up refresh timer:', error);
    }
  }

  // الحصول على التوكن الحالي
  public async getAccessToken(): Promise<string> {
    console.log("this.accessToken")
    console.log(this.accessToken)

    return this.accessToken || (await getAccessToken()) || '';
  }

  // التحقق من حالة تسجيل الدخول
  public async isAuthenticated(): Promise<boolean> {
    const token = await this.getAccessToken();
    if (!token) return false;

    try {
      const decodedToken = jwtDecode<TokenPayload>(token);
      return decodedToken.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  // بدء مؤقت تجديد التوكن
  private startRefreshTokenTimer() {
    try {
      const decodedToken = jwtDecode<TokenPayload>(this.accessToken);
      const expires = new Date(decodedToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000); // تجديد قبل دقيقة من الانتهاء

      this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
    } catch (error) {
      console.error('Error starting refresh timer:', error);
    }
  }

  // إيقاف مؤقت تجديد التوكن
  private stopRefreshTokenTimer() {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }

  // تجديد التوكن
  public async refreshToken(): Promise<string> {
    try {
      const response = await authApi.refreshToken({
        refreshToken: this.refresh_token || (await getRefreshToken()) || ''
      });

      const { accessToken, refreshToken } = response.data;
      await this.setTokens(accessToken, refreshToken);
      return accessToken;
    } catch (error) {
      await this.logout();
      throw new Error('Failed to refresh token');
    }
  }

  // تسجيل الخروج
  public async logout() {
    this.accessToken = '';
    this.refresh_token = '';
    await removeTokens();
    this.stopRefreshTokenTimer();
    redirectToLogin();
        
  }

  public async clearTokens() {
    this.accessToken = '';
    this.refresh_token = '';
    await removeTokens();
  }
}

export default AuthService.getInstance(); 