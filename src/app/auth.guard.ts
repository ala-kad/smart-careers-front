import { Injectable } from "@angular/core";
import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.authService.isAuthenticatedFun()) {
      return true; // User is authenticated, allow access
    } else {
      this.router.navigateByUrl('/login');
      return false; // User is not authenticated, deny access
    }
  }
}
