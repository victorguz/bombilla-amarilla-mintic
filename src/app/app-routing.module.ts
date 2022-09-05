import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './modules/private/components/layout/private/private.component';
import { PublicComponent } from './modules/public/components/layout/public.component';

const routes: Routes = [
  {
    path: 'private',
    component: PrivateComponent,
    loadChildren: () =>
      import('./modules/private/private.module').then((m) => m.PrivateModule),
  },
  {
    path: 'public',
    component: PublicComponent,
    loadChildren: () =>
      import('./modules/public/public.module').then((m) => m.PublicModule),
  },
  {
    path:'**',
    redirectTo:'public/login',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
