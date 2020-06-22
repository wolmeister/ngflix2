import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlyrModule } from 'ngx-plyr';
import { FeatherModule } from 'angular-feather';
import { ArrowLeft } from 'angular-feather/icons';

import { WatchRoutingModule } from './watch-routing.module';
import { WatchComponent } from './pages/watch/watch.component';

@NgModule({
  declarations: [WatchComponent],
  imports: [
    CommonModule,
    WatchRoutingModule,
    PlyrModule,
    FeatherModule.pick({ ArrowLeft }),
  ],
})
export class WatchModule {}
