
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-privilege',
  templateUrl: './add-privilege.component.html',
  styleUrls: ['./add-privilege.component.css']
})
export class AddPrivilegeComponent {
  @Output()
  cb_add_privilege=new EventEmitter()
  reactiveForm_add_privilege !: FormGroup;
  submitted:boolean=false
  loading_add_privilege :boolean=false
  form_details: any = {}
  loading_get_details_add_privilege_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_privilege_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_privilege  = this.formBuilder.group({
          nom_privilege: ["", Validators.required],
description: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_privilege .controls; }
  // validation du formulaire
  onSubmit_add_privilege () {
      this.submitted = true;
      console.log(this.reactiveForm_add_privilege .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_privilege .invalid) {
          return;
      }
      var privilege =this.reactiveForm_add_privilege .value
      this.add_privilege (privilege )
  }
  // vider le formulaire
  onReset_add_privilege () {
      this.submitted = false;
      this.reactiveForm_add_privilege .reset();
  }
  add_privilege(privilege: any) {
      this.loading_add_privilege = true;
      this.api.taf_post("privilege/add", privilege, (reponse: any) => {
      this.loading_add_privilege = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table privilege. Réponse= ", reponse);
          this.onReset_add_privilege()
          alert("Opération éffectuée avec succés")
          this.cb_add_privilege.emit({
            status:true,
            privilege:reponse.data
          })
      } else {
          console.log("L'opération sur la table privilege a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_privilege = false;
    })
  }
  
  get_details_add_privilege_form() {
      this.loading_get_details_add_privilege_form = true;
      this.api.taf_post("privilege/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table privilege. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table privilege a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_privilege_form = false;
      }, (error: any) => {
      this.loading_get_details_add_privilege_form = false;
    })
  }
}
