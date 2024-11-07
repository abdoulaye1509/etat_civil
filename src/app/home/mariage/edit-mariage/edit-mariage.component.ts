
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-mariage',
  templateUrl: './edit-mariage.component.html',
  styleUrls: ['./edit-mariage.component.css']
})
export class EditMariageComponent {
  reactiveForm_edit_mariage !: FormGroup;
  submitted: boolean = false
  loading_edit_mariage: boolean = false
  @Input()
  mariage_to_edit: any = {}
  @Output()
  cb_edit_mariage=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_mariage_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_mariage_form()
      this.update_form(this.mariage_to_edit)
  }
  // mise à jour du formulaire
  update_form(mariage_to_edit:any) {
      this.reactiveForm_edit_mariage = this.formBuilder.group({
          nom_epoux : [mariage_to_edit.nom_epoux, Validators.required],
nom_epouse : [mariage_to_edit.nom_epouse, Validators.required],
adresse : [mariage_to_edit.adresse],
date_mariage : [mariage_to_edit.date_mariage],
statut : [mariage_to_edit.statut],
nom_temoin_epoux : [mariage_to_edit.nom_temoin_epoux],
nom_temoin_epouse : [mariage_to_edit.nom_temoin_epouse]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_mariage .controls; }
  // validation du formulaire
  onSubmit_edit_mariage() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_mariage.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_mariage.invalid) {
          return;
      }
      var mariage = this.reactiveForm_edit_mariage.value
      this.edit_mariage({
      condition:JSON.stringify({id_mariage:this.mariage_to_edit.id_mariage}),
      data:JSON.stringify(mariage)
      })
  }
  // vider le formulaire
  onReset_edit_mariage() {
      this.submitted = false;
      this.reactiveForm_edit_mariage.reset();
  }
  edit_mariage(mariage: any) {
      this.loading_edit_mariage = true;
      this.api.taf_post("mariage/edit", mariage, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_mariage.emit({
                  new_data:JSON.parse(mariage.data)
              })
              console.log("Opération effectuée avec succés sur la table mariage. Réponse= ", reponse);
              this.onReset_edit_mariage()
              alert("Opération effectuée avec succés sur la table mariage")
          } else {
              console.log("L'opération sur la table mariage a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_mariage = false;
      }, (error: any) => {
          this.loading_edit_mariage = false;
      })
  }
  get_details_add_mariage_form() {
      this.loading_get_details_add_mariage_form = true;
      this.api.taf_post("mariage/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table mariage. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table mariage a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_mariage_form = false;
      }, (error: any) => {
      this.loading_get_details_add_mariage_form = false;
    })
  }
}
