import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppContextService } from '../../services/app-context.service';

@Component({
  selector: 'ac-site-navigation',
  templateUrl: './site-navigation.component.html',
  styleUrls: ['./site-navigation.component.css']
})
export class SiteNavigationComponent {
  public isUserLoggedIn!: Observable<boolean>;

  constructor(
    private appContextService: AppContextService
  ) {
    this.isUserLoggedIn = this.appContextService.isUserLoggedIn.asObservable();
  }
}
