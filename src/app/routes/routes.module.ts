import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewComponent } from '../admin-view/admin-view.component';
import { UserViewComponent } from '../user-view/user-view.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UserViewComponent },         
  { path: 'admin', component: AdminViewComponent },              
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesModule { }
