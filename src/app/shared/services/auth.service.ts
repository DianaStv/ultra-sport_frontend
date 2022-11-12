import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ILoginResponce, IUser } from "../interfaces";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('/api/auth/register', user);
  }

  login(user: IUser): Observable<ILoginResponce> {
    return this.http.post<ILoginResponce>('/api/auth/login', user)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('auth-token', token);
          this.token = token;
        })
      );
  }

  set token(token: string) {
    this._token = token;
  }

  get token(): string {
    return this._token || localStorage.getItem('auth-token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.token = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
