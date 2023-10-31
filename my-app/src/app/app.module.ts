import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsComponent } from './components/news-list/news/news.component';
import { ContextMenuComponent } from './shared/components/context-menu/context-menu.component';
import { ContextMenuCommandsComponent } from './components/news-list/context-menu-commands/context-menu-commands.component';
import { NewsThemeHighlightDirective } from './components/directives/news-theme-highlight.directive';
import { OperationAccessDirective } from './components/directives/operation-access.directive';
import { UppercaseFirstLetterPipe } from './shared/pipes/uppercase-first-letter.pipe';
import { FirstLetterPipe } from './shared/pipes/first-letter.pipe';
import { HttpInterceptorService } from './shared/services/http-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NewsThemeSelectorComponent } from './components/news-list/news-theme-selector/news-theme-selector.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SiteNavigationComponent } from './components/site-navigation/site-navigation.component';
import { LoginComponent } from './components/login/login.component';
import { LoggedInAccessDirective } from './components/directives/logged-in-access.directive';
import { NewsEditorComponent } from './components/news-list/news-editor/news-editor.component';
import { StoreModule } from '@ngrx/store';
import { effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    NewsComponent,
    ContextMenuComponent,
    ContextMenuCommandsComponent,
    NewsThemeHighlightDirective,
    OperationAccessDirective,
    UppercaseFirstLetterPipe,
    FirstLetterPipe,
    NewsThemeSelectorComponent,
    UserProfileComponent,
    SiteNavigationComponent,
    LoginComponent,
    LoggedInAccessDirective,
    NewsEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
