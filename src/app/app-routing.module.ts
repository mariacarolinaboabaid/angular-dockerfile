import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authAcessPrivate, authAcessPublic } from './guards/auth-activate.guard';
import { ErrorComponent } from './pages/error/error.component';


const routes: Routes = [
  {
    path: '', 
    canActivate: [authAcessPublic],
    loadChildren: () => import('./shared/layouts/public/public.module').then(m => m.PublicModule)
  },
  {
    path: '', 
    canActivate: [authAcessPrivate],
    loadChildren: () => import('./shared/layouts/private/private.module').then(m => m.PrivateModule)
  },
  { path: 'error', component: ErrorComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
