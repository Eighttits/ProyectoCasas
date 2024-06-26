import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',

    redirectTo: '/home',

    pathMatch: 'full'
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },
  // {
  //   path: 'componentes',
  //   loadChildren: () => import('./pages/componentes/componentes.module').then( m => m.ComponentesPageModule)
  // },
  // {
  //   path: 'camara',
  //   loadChildren: () => import('./pages/camara/camara.module').then( m => m.CamaraPageModule)
  // },
  // {
  //   path: 'contactos',
  //   loadChildren: () => import('./pages/contactos/contactos.module').then( m => m.ContactosPageModule)
  // },

  {

    path: 'casa/:id',

    loadChildren: () => import('./pages/casa/casa.module').then( m => m.CasaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'pagesAdmin/home-admin',
    loadChildren: () => import('./pagesAdmin/home-admin/home-admin.module').then( m => m.HomeAdminPageModule)
  },
  {
    path: 'pagesAdmin/add-house',
    loadChildren: () => import('./pagesAdmin/add-house/add-house.module').then( m => m.AddHousePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
