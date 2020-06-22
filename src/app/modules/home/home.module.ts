import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

@NgModule({
  declarations: [HomeComponent, AccountComponent, StatisticsComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
