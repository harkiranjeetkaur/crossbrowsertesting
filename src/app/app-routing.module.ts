import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RightBoxComponent} from './right-box/right-box.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'item/1', // redirect to Login by default
    pathMatch: 'full'
  },
  {
    path: 'item/:id',
    component: RightBoxComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
