
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-naissance',
  templateUrl: './add-naissance.component.html',
  styleUrls: ['./add-naissance.component.css']
})
export class AddNaissanceComponent {
  @Output()
  cb_add_naissance=new EventEmitter()
  reactiveForm_add_naissance !: FormGroup;
  submitted:boolean=false
  loading_add_naissance :boolean=false
  form_details: any = {}
  loading_get_details_add_naissance_form = false
  loading_get_naissance = false
  les_naissances: any[] = []
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_naissance_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_naissance  = this.formBuilder.group({
          prenom: ["", Validators.required],
nom: ["", Validators.required],
date_naissance: ["", Validators.required],
lieu_naissance: [""],
adresse: [""],
nom_pere: [""],
nom_mere: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_naissance .controls; }
  // validation du formulaire
  onSubmit_add_naissance () {
      this.submitted = true;
      console.log(this.reactiveForm_add_naissance .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_naissance .invalid) {
          return;
      }
      var naissance =this.reactiveForm_add_naissance .value
      this.add_naissance (naissance )
  }
  // vider le formulaire
  onReset_add_naissance () {
      this.submitted = false;
      this.reactiveForm_add_naissance .reset();
  }
  add_naissance(naissance: any) {
      this.loading_add_naissance = true;
      this.api.taf_post("naissance/add", naissance, (reponse: any) => {
      this.loading_add_naissance = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table naissance. Réponse= ", reponse);
          this.onReset_add_naissance()
          this.cb_add_naissance.emit({
            status:true,
            naissance:reponse.data
          })
          this.api.Swal_success("Naissance Enregistrer avec succés")
          this.get_naissance(); // Actualiser la liste après ajout
       } else {
         console.log(
           "L'opération sur la table enfant a échoué. Réponse= ",
           reponse
         );
         this.api.Swal_error("ERREUR DE SAISIE!!!");
       }
   }, (error: any) => {
        this.loading_add_naissance = false;
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
  get_naissance() {
    this.loading_get_naissance = true;
    this.api.taf_post("naissance/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_naissances = reponse.data
        console.log("Opération effectuée avec succés sur la table naissance. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table naissance a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_naissance = false;
    }, (error: any) => {
      this.loading_get_naissance = false;
    })
  }

}
