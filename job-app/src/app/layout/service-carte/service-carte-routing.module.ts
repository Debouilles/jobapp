import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceCartePage } from './service-carte.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceCartePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceCartePageRoutingModule {}
