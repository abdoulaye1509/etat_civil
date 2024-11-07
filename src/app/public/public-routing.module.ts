import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ConnexionComponent } from './connexion/connexion.component';

const routes: Routes = [
  {path:"",component:IndexComponent},
  {path:"connexion",component:ConnexionComponent},
  // { path: "deconnexion", component: DeconnexionComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }