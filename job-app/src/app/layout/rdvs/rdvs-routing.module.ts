import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RDVSPage } from './rdvs.page';

const routes: Routes = [
  {
    path: '',
    component: RDVSPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RDVSPageRoutingModule {}
