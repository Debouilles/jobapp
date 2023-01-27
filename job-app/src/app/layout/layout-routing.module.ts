import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: "",
        redirectTo: "service-list",
        pathMatch: "full"
      },

      {
        path: 'create-service',
        loadChildren: () => import('./create-service/create-service.module').then(m => m.CreateServicePageModule)
      },
      {
        path: 'service-list',
        pathMatch: "full",
        loadChildren: () => import('./service-list/service-list.module').then(m => m.ServiceListPageModule)
      },
     
      {
        path: 'rdvs',
        loadChildren: () => import('./rdvs/rdvs.module').then(m => m.RDVSPageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('./profil/profil.module').then(m => m.ProfilPageModule)
      },
      {
        path: 'service-map',
        loadChildren: () => import('./service-map/service-map.module').then(m => m.ServiceMapPageModule)
      }
    ]
  },]
  ;


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule { }
