import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./auth/auth.guard";
import { CreateServicePage } from './layout/create-service/create-service.page';


const routes: Routes = [
  {
    path: "",
    // Add the guard to the canActivate array of this route
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./layout/layout.module").then((m) => m.LayoutPageModule),
  },
  
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registrate',
    loadChildren: () => import('./registrate/registrate.module').then( m => m.RegistratePageModule)
  },
  { path: 'create-service', component: CreateServicePage },
  {
    path: 'service-map',
    loadChildren: () => import('./service-map/service-map.module').then( m => m.ServiceMapPageModule)
  },  {
    path: 'page-service',
    loadChildren: () => import('./page-service/page-service.module').then( m => m.PageServicePageModule)
  },


  // {
  //   path: 'service-list',
  //   loadChildren: () => import('./service-list/service-list.module').then( m => m.ServiceListPageModule)
  // }
  
];

// const routes: Routes = [
//   // {
//   //   path: '',
//   //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
//   // }
// ];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
