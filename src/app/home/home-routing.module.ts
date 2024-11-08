import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAgentComponent } from './agent/list-agent/list-agent.component';
import { ListDecesComponent } from './deces/list-deces/list-deces.component';
import { ListMariageComponent } from './mariage/list-mariage/list-mariage.component';
import { ListNaissanceComponent } from './naissance/list-naissance/list-naissance.component';
import { ListPrivilegeComponent } from './privilege/list-privilege/list-privilege.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:"",component:ListAgentComponent},
{path:"agent",component:ListAgentComponent},
{path:"deces",component:ListDecesComponent},
{path:"mariage",component:ListMariageComponent},
{path:"naissance",component:ListNaissanceComponent},
{path:"privilege",component:ListPrivilegeComponent},
{path:"dashboard",component:DashboardComponent},
{path:"les_agents",component:ListAgentComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }