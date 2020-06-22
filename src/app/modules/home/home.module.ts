import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Play } from 'angular-feather/icons';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { HeaderComponent } from './components/header/header.component';
import { BillboardComponent } from './components/billboard/billboard.component';
import { RatingComponent } from './components/rating/rating.component';

@NgModule({
  declarations: [
    HomeComponent,
    AccountComponent,
    StatisticsComponent,
    HeaderComponent,
    BillboardComponent,
    RatingComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, FeatherModule.pick({ Play })],
})
export class HomeModule {}
