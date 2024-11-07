
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-privilege',
  templateUrl: './edit-privilege.component.html',
  styleUrls: ['./edit-privilege.component.css']
})
export class EditPrivilegeComponent {
  reactiveForm_edit_privilege !: FormGroup;
  submitted: boolean = false
  loading_edit_privilege: boolean = false
  @Input()
  privilege_to_edit: any = {}
  @Output()
  cb_edit_privilege=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_privilege_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_privilege_form()
      this.update_form(this.privilege_to_edit)
  }
  // mise à jour du formulaire
  update_form(privilege_to_edit:any) {
      this.reactiveForm_edit_privilege = this.formBuilder.group({
          nom_privilege : [privilege_to_edit.nom_privilege, Validators.required],
description : [privilege_to_edit.description]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_privilege .controls; }
  // validation du formulaire
  onSubmit_edit_privilege() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_privilege.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_privilege.invalid) {
          return;
      }
      var privilege = this.reactiveForm_edit_privilege.value
      this.edit_privilege({
      condition:JSON.stringify({id_privilege:this.privilege_to_edit.id_privilege}),
      data:JSON.stringify(privilege)
      })
  }
  // vider le formulaire
  onReset_edit_privilege() {
      this.submitted = false;
      this.reactiveForm_edit_privilege.reset();
  }
  edit_privilege(privilege: any) {
      this.loading_edit_privilege = true;
      this.api.taf_post("privilege/edit", privilege, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_privilege.emit({
                  new_data:JSON.parse(privilege.data)
              })
              console.log("Opération effectuée avec succés sur la table privilege. Réponse= ", reponse);
              this.onReset_edit_privilege()
              alert("Opération effectuée avec succés sur la table privilege")
          } else {
              console.log("L'opération sur la table privilege a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_privilege = false;
      }, (error: any) => {
          this.loading_edit_privilege = false;
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
