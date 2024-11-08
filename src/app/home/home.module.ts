import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  
  import { HomeRoutingModule } from './home-routing.module';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { EditAgentComponent } from './agent/edit-agent/edit-agent.component';
import { AddDecesComponent } from './deces/add-deces/add-deces.component';
import { EditDecesComponent } from './deces/edit-deces/edit-deces.component';
import { ListDecesComponent } from './deces/list-deces/list-deces.component';
import { AddMariageComponent } from './mariage/add-mariage/add-mariage.component';
import { EditMariageComponent } from './mariage/edit-mariage/edit-mariage.component';
import { ListMariageComponent } from './mariage/list-mariage/list-mariage.component';
import { AddNaissanceComponent } from './naissance/add-naissance/add-naissance.component';
import { EditNaissanceComponent } from './naissance/edit-naissance/edit-naissance.component';
import { ListNaissanceComponent } from './naissance/list-naissance/list-naissance.component';
import { AddPrivilegeComponent } from './privilege/add-privilege/add-privilege.component';
import { EditPrivilegeComponent } from './privilege/edit-privilege/edit-privilege.component';
import { ListPrivilegeComponent } from './privilege/list-privilege/list-privilege.component';
import { HttpClientModule } from '@angular/common/http';
import { AddAgentComponent } from './agent/add-agent/add-agent.component';

  
  @NgModule({
    declarations: [
    // HomeComponent,
    AddAgentComponent,
    EditAgentComponent,
    AddDecesComponent,
    EditDecesComponent,
    ListDecesComponent,
    AddMariageComponent,
    EditMariageComponent,
    ListMariageComponent,
    AddNaissanceComponent,
    EditNaissanceComponent,
    ListNaissanceComponent,
    AddPrivilegeComponent,
    EditPrivilegeComponent,
    ListPrivilegeComponent
  ],
    imports: [
      CommonModule,
      HomeRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule
      
    ]
  })
  export class HomeModule { }
  