import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PralPage } from './pral.page';

const routes: Routes = [
  {
    path: '',
    component: PralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PralPageRoutingModule {}
