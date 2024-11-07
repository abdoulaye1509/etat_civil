
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-agent',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule,FormsModule,],
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css'],
   schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajoutez ceci seulement si vous utilisez des Web Components

})
export class AddAgentComponent {
  @Output()
  cb_add_agent=new EventEmitter()
  reactiveForm_add_agent !: FormGroup;
  submitted:boolean=false
  loading_add_agent :boolean=false
  form_details: any = {}
  loading_get_details_add_agent_form = false
  passwordType = 'password';
  passwordShown = false;
  les_privileges: any[] = []
  loading_get_privilege: boolean =false;
  loading_get_agent: boolean= false;
  les_agents: any;

  constructor(private formBuilder: FormBuilder,public api:ApiService) { }
  showPassword: boolean = false; // Ajout de la propriété pour gérer la visibilité du mot de passe

  ngOnInit(): void {
      this.get_details_add_agent_form()
      this.init_form();
      this.get_privilege()
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
  public passwordToogle() {
    this.passwordShown = !this.passwordShown;
    if (!this.passwordShown) {
      this.passwordType = 'password';
    } else {
      this.passwordType = 'text';
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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
      this.loading_add_agent = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table agent. Réponse= ", reponse);
          this.onReset_add_agent()
          alert("Opération éffectuée avec succés")
          this.cb_add_agent.emit({
            status:true,
            agent:reponse.data
          })
          this.api.Swal_success("Agent Enregistrer avec succés")
          this.get_agent(); // Actualiser la liste après ajout
       } else {
         console.log(
           "L'opération sur la table agent a échoué. Réponse= ",
           reponse
         );
         this.api.Swal_error("ERREUR DE SAISIE!!!");
       }
   }, (error: any) => {
        this.loading_add_agent = false;
    })
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
