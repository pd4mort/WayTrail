import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { logoutPage } from './logout.page';

const routes: Routes = [
  {
    path: '',
    component: logoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class logoutPageRoutingModule {}
