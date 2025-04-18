import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './features/shared/layout/main-layout/main-layout.component';
import { LoginComponent } from './features/shared/component/login/login.component';
import { PageNotFoundComponent } from './features/shared/component/page-not-found/page-not-found.component';
import { AuthguardGuard } from './features/shared/services/auth.service';
import { ProfileComponent } from './features/shared/component/profile/profile.component';

const routes: Routes = [
  {
    path : 'login', component : LoginComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'profile', canActivate: [AuthguardGuard], component: MainLayoutComponent , children: [
      {
        path: '',
        component: ProfileComponent
      }
    ],
  },
  {
    path: 'admin',component : MainLayoutComponent, canActivate: [AuthguardGuard],
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'menufacture', component : MainLayoutComponent,
    loadChildren: () => import('./features/menufacture/menufacture.module').then(m => m.MenufactureModule)
  },
  {
    path: '**', component : PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
