import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('@ad/home').then((x) => x.HomeModule),
    pathMatch: 'full',
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('@ad/appointments').then((x) => x.AppointmentsModule),
  },
  {
    path: 'owners',
    loadChildren: () => import('@ad/owners').then((x) => x.OwnersModule),
  },
  {
    path: 'dogs',
    loadChildren: () => import('@ad/dogs').then((x) => x.DogsModule),
  },
  {
    path: 'places',
    loadChildren: () => import('@ad/places').then((x) => x.PlacesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
