import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageServicePage } from './page-service.page';

const routes: Routes = [
  {
    path: '',
    component: PageServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageServicePageRoutingModule {}
