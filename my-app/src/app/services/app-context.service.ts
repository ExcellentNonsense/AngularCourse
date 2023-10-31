import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageKey } from '../directories/local-storage-key';

@Injectable({
  providedIn: 'root'
})
export class AppContextService implements OnInit {
  public isUserLoggedIn = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.isUserLoggedIn.next(localStorage.getItem(LocalStorageKey.AcAppUserSecurityToken) !== null);
  }

  public logIn(securityToken: string) {
    localStorage.setItem(LocalStorageKey.AcAppUserSecurityToken, securityToken);
    this.isUserLoggedIn.next(true);
  }

  public logOut() {
    localStorage.removeItem(LocalStorageKey.AcAppUserSecurityToken);
    this.isUserLoggedIn.next(false);
  }
}
