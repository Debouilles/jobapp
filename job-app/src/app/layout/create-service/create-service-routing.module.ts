import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateServicePage } from './create-service.page';

const routes: Routes = [
  {
    path: '',
    component: CreateServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateServicePageRoutingModule {}
