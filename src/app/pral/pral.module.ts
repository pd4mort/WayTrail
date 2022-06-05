import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PralPageRoutingModule } from './pral-routing.module';

import { PralPage } from './pral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PralPageRoutingModule
  ],
  declarations: [PralPage]
})
export class PralPageModule {}
