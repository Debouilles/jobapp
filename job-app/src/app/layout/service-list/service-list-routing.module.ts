import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { services } from './service-list.page';

const routes: Routes = [
  {
    path: '',
    component: services
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceListPageRoutingModule {}
