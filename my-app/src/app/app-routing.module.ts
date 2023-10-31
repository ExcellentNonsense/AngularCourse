import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NewsEditorComponent } from './components/news-list/news-editor/news-editor.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'news', component: NewsListComponent },
  { path: 'add-news', component: NewsEditorComponent, outlet: 'newsEditor' },
  { path: 'edit-news/:news-id', component: NewsEditorComponent, outlet: 'newsEditor' },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/news', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
