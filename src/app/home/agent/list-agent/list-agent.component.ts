import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-list-agent',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule,FormsModule,],
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajoutez ceci seulement si vous utilisez des Web Components
})
export class ListAgentComponent {
  loading_get_agent = false
  les_agents: any[] = []
  selected_agent: any = undefined
  agent_to_edit: any = undefined
  loading_delete_agent = false
  les_privileges: any[] = []
  loading_get_privilege: boolean =false;
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_agent()
  }
  get_agent() {
    this.loading_get_agent = true;
    this.api.taf_post("agent/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_agents = reponse.data
        console.log("Opération effectuée avec succés sur la table agent. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table agent a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_agent = false;
    }, (error: any) => {
      this.loading_get_agent = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_agents.unshift(event.agent)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_agents[this.les_agents.indexOf(this.agent_to_edit)]=params.new_data
  }
  voir_plus(one_agent: any) {
    this.selected_agent = one_agent
  }
  on_click_edit(one_agent: any) {
    this.agent_to_edit = one_agent
  }
  on_close_modal_edit(){
    this.agent_to_edit=undefined
  }
  delete_agent (agent : any){
    this.loading_delete_agent = true;
    this.api.taf_post("agent/delete", agent,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table agent . Réponse = ",reponse)
        this.api.Swal_success("Agent Supprimer avec succés")
        this.get_agent()
        // alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table agent  a échoué. Réponse = ",reponse)
        this.api.Swal_error("ERREUR DE SUPPRESSION!!!");
        // alert("L'opération a échouée")
      }
      this.loading_delete_agent = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_agent = false;
    })
  }
  get_privilege() {
    this.loading_get_privilege = true;
    this.api.taf_post("privilege/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_privileges = reponse.data
        console.log("Opération effectuée avec succés sur la table privilege. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table privilege a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_privilege = false;
    }, (error: any) => {
      this.loading_get_privilege = false;
    })
  }

}