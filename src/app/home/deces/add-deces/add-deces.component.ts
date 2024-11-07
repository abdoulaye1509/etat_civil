
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-deces',
  templateUrl: './add-deces.component.html',
  styleUrls: ['./add-deces.component.css']
})
export class AddDecesComponent {
  @Output()
  cb_add_deces=new EventEmitter()
  reactiveForm_add_deces !: FormGroup;
  submitted:boolean=false
  loading_add_deces :boolean=false
  form_details: any = {}
  loading_get_details_add_deces_form = false
  loading_get_deces = false
  les_decess: any[] = []
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_deces_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_deces  = this.formBuilder.group({
          prenom_defunt: ["", Validators.required],
nom_defunt: ["", Validators.required],
adresse_defunt: [""],
date_deces: [""],
heure_deces: [""],
lieu_deces: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_deces .controls; }
  // validation du formulaire
  onSubmit_add_deces () {
      this.submitted = true;
      console.log(this.reactiveForm_add_deces .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_deces .invalid) {
          return;
      }
      var deces =this.reactiveForm_add_deces .value
      this.add_deces (deces )
  }
  // vider le formulaire
  onReset_add_deces () {
      this.submitted = false;
      this.reactiveForm_add_deces .reset();
  }
  add_deces(deces: any) {
      this.loading_add_deces = true;
      this.api.taf_post("deces/add", deces, (reponse: any) => {
      this.loading_add_deces = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table deces. Réponse= ", reponse);
          this.onReset_add_deces()
          // alert("Opération éffectuée avec succés")
          this.cb_add_deces.emit({
            status:true,
            deces:reponse.data
          })
          this.api.Swal_success("Décès Enregistrer avec succés")
           this.get_deces(); // Actualiser la liste après ajout
        } else {
          console.log(
            "L'opération sur la table enfant a échoué. Réponse= ",
            reponse
          );
          this.api.Swal_error("ERREUR DE SAISIE!!!");
        }
    }, (error: any) => {
        this.loading_add_deces = false;
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
  get_deces() {
    this.loading_get_deces = true;
    this.api.taf_post("deces/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_decess = reponse.data
        console.log("Opération effectuée avec succés sur la table deces. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table deces a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_deces = false;
    }, (error: any) => {
      this.loading_get_deces = false;
    })
  }
}
