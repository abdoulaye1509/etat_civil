import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../service/api/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
})
export class ConnexionComponent {
  reactiveForm_login_login !: FormGroup;
  submitted: boolean = false
  loading_login_login: boolean = false
  passwordType = 'password';
  passwordShown = false;

  constructor(private formBuilder: FormBuilder, public api: ApiService, private router: Router) { }
  showPassword: boolean = false; // Ajout de la propriété pour gérer la visibilité du mot de passe

  ngOnInit(): void {
    // this.api.deconnexion()
    this.init_form()
  }
  init_form() {
    this.reactiveForm_login_login = this.formBuilder.group({
      login: ["", Validators.required],
      pwd: ["", Validators.required]
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

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_login_login.controls; }
  // validation du formulaire
  onSubmit_login_login() {
    this.submitted = true;
    console.log(this.reactiveForm_login_login.value)
    // stop here if form is invalid
    if (this.reactiveForm_login_login.invalid) {
      return;
    }
    var login = this.reactiveForm_login_login.value
    this.login_login(login);
    //console.log('data login', login)
  }
  // vider le formulaire
  onReset_login_login() {
    this.submitted = false;
    this.reactiveForm_login_login.reset();
  }
  login_login(login: any) {
    this.loading_login_login = true;
    this.api.taf_post_login("taf_auth/auth", login, async (reponse: any) => {
      if (reponse.status) {
        //console.log("Opération effectuée avec succés sur la table login. Réponse= ", reponse);
        this.onReset_login_login()
        await this.api.save_on_local_storage("token", reponse.data)
        this.api.Swal_success("Opération éffectuée avec succés")
        await this.api.update_data_from_token()
         this.api.custom_redirect_user()
        //  console.log("token n : ",reponse.data)
      } else {
        console.log("L'opération sur la table login a échoué. Réponse= ", reponse);
         this.api.Swal_error("opération a echoué")
         this.api.Swal_error('L\'adresse email ou le mot de passe que vous avez fourni est incorrect')
      }
      this.loading_login_login = false;
    }, (error: any) => {
      this.loading_login_login = false;
    })
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
