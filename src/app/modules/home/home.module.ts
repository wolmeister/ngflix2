import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import {
  Play,
  PlayCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from 'angular-feather/icons';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { HeaderComponent } from './components/header/header.component';
import { BillboardComponent } from './components/billboard/billboard.component';
import { SliderComponent } from './components/slider/slider.component';
import { SliderItemComponent } from './components/slider-item/slider-item.component';
import { RatingComponent } from './components/rating/rating.component';

@NgModule({
  declarations: [
    HomeComponent,
    AccountComponent,
    StatisticsComponent,
    HeaderComponent,
    BillboardComponent,
    SliderComponent,
    SliderItemComponent,
    RatingComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FeatherModule.pick({
      Play,
      PlayCircle,
      ChevronDown,
      ChevronLeft,
      ChevronRight,
      X,
    }),
  ],
})
export class HomeModule {}
