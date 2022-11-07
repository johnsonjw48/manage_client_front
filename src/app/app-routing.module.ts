import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ManageClientsComponent} from "./manage-clients/manage-clients.component";
import {ListComponent} from "./list/list.component";


const routes:Routes = [
  {path: 'manage', component: ManageClientsComponent},
  {path: '', component: ListComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
