import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchComponent } from './pages/watch/watch.component';
import { RoutesConfig } from '../../configs/routes.config';

const routes: Routes = [
  { path: RoutesConfig.watch.watchMedia, component: WatchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchRoutingModule {}
