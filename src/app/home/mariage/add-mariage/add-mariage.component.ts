
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-mariage',
  templateUrl: './add-mariage.component.html',
  styleUrls: ['./add-mariage.component.css']
})
export class AddMariageComponent {
  @Output()
  cb_add_mariage=new EventEmitter()
  reactiveForm_add_mariage !: FormGroup;
  submitted:boolean=false
  loading_add_mariage :boolean=false
  form_details: any = {}
  loading_get_details_add_mariage_form = false
  loading_get_mariage = false
  les_mariages: any[] = []
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_mariage_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_mariage  = this.formBuilder.group({
          nom_epoux: ["", Validators.required],
          nom_epouse: ["", Validators.required],
          adresse: [""],
          date_mariage: [""],
          statut: [""],
          nom_temoin_epoux: [""],
          nom_temoin_epouse: [""]
                });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_mariage .controls; }
  // validation du formulaire
  onSubmit_add_mariage () {
      this.submitted = true;
      console.log(this.reactiveForm_add_mariage .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_mariage .invalid) {
          return;
      }
      var mariage =this.reactiveForm_add_mariage .value
      this.add_mariage (mariage )
  }
  // vider le formulaire
  onReset_add_mariage () {
      this.submitted = false;
      this.reactiveForm_add_mariage .reset();
  }
  add_mariage(mariage: any) {
      this.loading_add_mariage = true;
      this.api.taf_post("mariage/add", mariage, (reponse: any) => {
      this.loading_add_mariage = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table mariage. Réponse= ", reponse);
          this.onReset_add_mariage()
          this.cb_add_mariage.emit({
            status:true,
            mariage:reponse.data
          })
          this.api.Swal_success("Mariage Enregistrer avec succés")
          this.get_mariage(); // Actualiser la liste après ajout
       } else {
         console.log(
           "L'opération sur la table enfant a échoué. Réponse= ",
           reponse
         );
         this.api.Swal_error("ERREUR DE SAISIE!!!");
       }
   }, (error: any) => {
        this.loading_add_mariage = false;
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
  get_mariage() {
    this.loading_get_mariage = true;
    this.api.taf_post("mariage/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_mariages = reponse.data
        console.log("Opération effectuée avec succés sur la table mariage. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table mariage a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_mariage = false;
    }, (error: any) => {
      this.loading_get_mariage = false;
    })
  }
}
