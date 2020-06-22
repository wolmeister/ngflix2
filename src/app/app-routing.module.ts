import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { RoutesConfig } from './configs/routes.config';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: RoutesConfig.authentication.basePath,
        canActivate: [AuthGuardService],
        data: { isAuthPage: true },
        loadChildren: () =>
          import('./modules/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
      {
        path: RoutesConfig.home.basePath,
        canActivate: [AuthGuardService],
        data: { isPrivate: true },
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: RoutesConfig.watch.basePath,
        canActivate: [AuthGuardService],
        data: { isPrivate: true },
        loadChildren: () =>
          import('./modules/watch/watch.module').then((m) => m.WatchModule),
      },
      {
        path: RoutesConfig.notFound,
        component: NotFoundComponent,
      },
      {
        path: '**',
        redirectTo: RoutesConfig.notFound,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
