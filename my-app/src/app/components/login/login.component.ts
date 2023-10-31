import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LocalStorageKey } from '../../directories/local-storage-key';
import { AuthorizationInfo } from '../../models/authorization-info';
import { AppContextService } from '../../services/app-context.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'ac-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  public isLoginFailed: boolean = false;

  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private appContextService: AppContextService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
    this.logOut();
  }

  get login() { return this.loginForm.get("login") as AbstractControl; }
  get password() { return this.loginForm.get("password") as AbstractControl; }

  public logIn() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      let authInfo: AuthorizationInfo = {
        login: this.loginForm.get("login")!.value,
        password: this.loginForm.get("password")!.value,
      };

      this.authService.logIn(authInfo)
        .pipe(takeUntil(this.destroy$))
        .subscribe(securityToken => {
          if (securityToken != null && securityToken.length > 0) {
            this.appContextService.logIn(securityToken);
            this.router.navigateByUrl("");
          }
          else {
            this.isLoginFailed = true;
          }
        });
    }
  }

  public logOut() {
    this.appContextService.logOut();
  }

  public ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private initLoginForm() {
    this.loginForm = this.fb.group({
      login: this.fb.control("", [Validators.required, Validators.maxLength(100)]),
      password: this.fb.control("", [Validators.required, Validators.minLength(1), Validators.maxLength(50)])
    });
  }
}
