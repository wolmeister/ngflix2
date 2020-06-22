import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { RoutesConfig } from '../../configs/routes.config';

const routes: Routes = [
  { path: RoutesConfig.home.home, component: HomeComponent },
  { path: RoutesConfig.home.account, component: AccountComponent },
  { path: RoutesConfig.home.statistics, component: StatisticsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
