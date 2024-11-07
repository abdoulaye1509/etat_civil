
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-deces',
  templateUrl: './edit-deces.component.html',
  styleUrls: ['./edit-deces.component.css']
})
export class EditDecesComponent {
  reactiveForm_edit_deces !: FormGroup;
  submitted: boolean = false
  loading_edit_deces: boolean = false
  @Input()
  deces_to_edit: any = {}
  @Output()
  cb_edit_deces=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_deces_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_deces_form()
      this.update_form(this.deces_to_edit)
  }
  // mise à jour du formulaire
  update_form(deces_to_edit:any) {
      this.reactiveForm_edit_deces = this.formBuilder.group({
          prenom_defunt : [deces_to_edit.prenom_defunt, Validators.required],
nom_defunt : [deces_to_edit.nom_defunt, Validators.required],
adresse_defunt : [deces_to_edit.adresse_defunt],
date_deces : [deces_to_edit.date_deces],
heure_deces : [deces_to_edit.heure_deces],
lieu_deces : [deces_to_edit.lieu_deces]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_deces .controls; }
  // validation du formulaire
  onSubmit_edit_deces() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_deces.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_deces.invalid) {
          return;
      }
      var deces = this.reactiveForm_edit_deces.value
      this.edit_deces({
      condition:JSON.stringify({id_deces:this.deces_to_edit.id_deces}),
      data:JSON.stringify(deces)
      })
  }
  // vider le formulaire
  onReset_edit_deces() {
      this.submitted = false;
      this.reactiveForm_edit_deces.reset();
  }
  edit_deces(deces: any) {
      this.loading_edit_deces = true;
      this.api.taf_post("deces/edit", deces, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_deces.emit({
                  new_data:JSON.parse(deces.data)
              })
              console.log("Opération effectuée avec succés sur la table deces. Réponse= ", reponse);
              this.onReset_edit_deces()
              alert("Opération effectuée avec succés sur la table deces")
          } else {
              console.log("L'opération sur la table deces a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_deces = false;
      }, (error: any) => {
          this.loading_edit_deces = false;
      })
  }
  get_details_add_deces_form() {
      this.loading_get_details_add_deces_form = true;
      this.api.taf_post("deces/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table deces. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table deces a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_deces_form = false;
      }, (error: any) => {
      this.loading_get_details_add_deces_form = false;
    })
  }
}
