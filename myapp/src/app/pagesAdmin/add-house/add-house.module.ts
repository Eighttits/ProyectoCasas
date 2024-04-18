import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddHousePageRoutingModule } from './add-house-routing.module';

import { AddHousePage } from './add-house.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddHousePageRoutingModule
  ],
  declarations: [AddHousePage]
})
export class AddHousePageModule {}
