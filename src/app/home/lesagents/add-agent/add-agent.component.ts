import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-agent',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-agent.component.html',
  styleUrl: './add-agent.component.css'
})
export class AddAgentComponent {

  reactiveForm_add_agent !: FormGroup;
submitted:boolean=false
loading_add_agent :boolean=false
form_details: any = {}
loading_get_details_add_agent_form = false
constructor(private formBuilder: FormBuilder,public api:ApiService) { }

ngOnInit(): void {
this.get_details_add_agent_form()
this.init_form()
}
init_form() {
    this.reactiveForm_add_agent  = this.formBuilder.group({
    prenom_agent: ["", Validators.required],
    nom_agent: ["", Validators.required],
    adresse_agent: [""],
    tel: [""],
    fonction: [""],
    email: [""],
    password: [""],
    id_privilege: [""]
    });
}

// acces facile au champs de votre formulaire
get f(): any { return this.reactiveForm_add_agent .controls; }
    // validation du formulaire
    onSubmit_add_agent () {
    this.submitted = true;
    console.log(this.reactiveForm_add_agent .value)
    // stop here if form is invalid
    if (this.reactiveForm_add_agent .invalid) {
    return;
    }
    var agent =this.reactiveForm_add_agent .value
    this.add_agent (agent )
    }
    // vider le formulaire
    onReset_add_agent () {
    this.submitted = false;
    this.reactiveForm_add_agent .reset();
}
add_agent(agent: any) {
    this.loading_add_agent = true;
    this.api.taf_post("agent/add", agent, (reponse: any) => {
    if (reponse.status) {
    console.log("Opération effectuée avec succés sur la table agent. Réponse= ", reponse);
    this.onReset_add_agent()
    alert("agent ajouté avec succés")
    } else {
    console.log("L\'opération sur la table agent a échoué. Réponse= ", reponse);
    alert("L'opération a echoué")
    }
    this.loading_add_agent = false;
    }, (error: any) => {
    this.loading_add_agent = false;
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
