import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './modules/private/components/layout/private/private.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    loadChildren: () =>
      import('./modules/private/private.module').then((m) => m.PrivateModule),
  },
  { path: 'public', loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
