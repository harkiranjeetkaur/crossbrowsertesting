import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RightBoxComponent} from './right-box/right-box.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'item/1', // redirect to Login by default
    pathMatch: 'full'
  },
  {
    path: 'item/:id',
    component: RightBoxComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
