
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-naissance',
  templateUrl: './edit-naissance.component.html',
  styleUrls: ['./edit-naissance.component.css']
})
export class EditNaissanceComponent {
  reactiveForm_edit_naissance !: FormGroup;
  submitted: boolean = false
  loading_edit_naissance: boolean = false
  @Input()
  naissance_to_edit: any = {}
  @Output()
  cb_edit_naissance=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_naissance_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_naissance_form()
      this.update_form(this.naissance_to_edit)
  }
  // mise à jour du formulaire
  update_form(naissance_to_edit:any) {
      this.reactiveForm_edit_naissance = this.formBuilder.group({
          prenom : [naissance_to_edit.prenom, Validators.required],
nom : [naissance_to_edit.nom, Validators.required],
date_naissance : [naissance_to_edit.date_naissance, Validators.required],
lieu_naissance : [naissance_to_edit.lieu_naissance],
adresse : [naissance_to_edit.adresse],
nom_pere : [naissance_to_edit.nom_pere],
nom_mere : [naissance_to_edit.nom_mere]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_naissance .controls; }
  // validation du formulaire
  onSubmit_edit_naissance() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_naissance.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_naissance.invalid) {
          return;
      }
      var naissance = this.reactiveForm_edit_naissance.value
      this.edit_naissance({
      condition:JSON.stringify({id_naissance:this.naissance_to_edit.id_naissance}),
      data:JSON.stringify(naissance)
      })
  }
  // vider le formulaire
  onReset_edit_naissance() {
      this.submitted = false;
      this.reactiveForm_edit_naissance.reset();
  }
  edit_naissance(naissance: any) {
      this.loading_edit_naissance = true;
      this.api.taf_post("naissance/edit", naissance, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_naissance.emit({
                  new_data:JSON.parse(naissance.data)
              })
              console.log("Opération effectuée avec succés sur la table naissance. Réponse= ", reponse);
              this.onReset_edit_naissance()
              alert("Opération effectuée avec succés sur la table naissance")
          } else {
              console.log("L'opération sur la table naissance a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_naissance = false;
      }, (error: any) => {
          this.loading_edit_naissance = false;
      })
  }
  get_details_add_naissance_form() {
      this.loading_get_details_add_naissance_form = true;
      this.api.taf_post("naissance/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table naissance. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table naissance a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_naissance_form = false;
      }, (error: any) => {
      this.loading_get_details_add_naissance_form = false;
    })
  }
}
