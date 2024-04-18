import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddHousePage } from './add-house.page';

const routes: Routes = [
  {
    path: '',
    component: AddHousePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddHousePageRoutingModule {}
