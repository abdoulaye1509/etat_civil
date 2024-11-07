
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.css']
})
export class EditAgentComponent {
  reactiveForm_edit_agent !: FormGroup;
  submitted: boolean = false
  loading_edit_agent: boolean = false
  @Input()
  agent_to_edit: any = {}
  @Output()
  cb_edit_agent=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_agent_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_agent_form()
      this.update_form(this.agent_to_edit)
  }
  // mise à jour du formulaire
  update_form(agent_to_edit:any) {
      this.reactiveForm_edit_agent = this.formBuilder.group({
          prenom_agent : [agent_to_edit.prenom_agent, Validators.required],
nom_agent : [agent_to_edit.nom_agent, Validators.required],
adresse_agent : [agent_to_edit.adresse_agent],
tel : [agent_to_edit.tel],
fonction : [agent_to_edit.fonction],
email : [agent_to_edit.email],
password : [agent_to_edit.password],
id_privilege : [agent_to_edit.id_privilege]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_agent .controls; }
  // validation du formulaire
  onSubmit_edit_agent() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_agent.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_agent.invalid) {
          return;
      }
      var agent = this.reactiveForm_edit_agent.value
      this.edit_agent({
      condition:JSON.stringify({id_agent:this.agent_to_edit.id_agent}),
      data:JSON.stringify(agent)
      })
  }
  // vider le formulaire
  onReset_edit_agent() {
      this.submitted = false;
      this.reactiveForm_edit_agent.reset();
  }
  edit_agent(agent: any) {
      this.loading_edit_agent = true;
      this.api.taf_post("agent/edit", agent, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_agent.emit({
                  new_data:JSON.parse(agent.data)
              })
              console.log("Opération effectuée avec succés sur la table agent. Réponse= ", reponse);
              this.onReset_edit_agent()
              alert("Opération effectuée avec succés sur la table agent")
          } else {
              console.log("L'opération sur la table agent a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_agent = false;
      }, (error: any) => {
          this.loading_edit_agent = false;
      })
  }
  get_details_add_agent_form() {
      this.loading_get_details_add_agent_form = true;
      this.api.taf_post("agent/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table agent. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table agent a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_agent_form = false;
      }, (error: any) => {
      this.loading_get_details_add_agent_form = false;
    })
  }
}
