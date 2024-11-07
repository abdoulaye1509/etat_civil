import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-naissance',
  templateUrl: './list-naissance.component.html',
  styleUrls: ['./list-naissance.component.css']
})
export class ListNaissanceComponent {
  loading_get_naissance = false
  les_naissances: any[] = []
  selected_naissance: any = undefined
  naissance_to_edit: any = undefined
  loading_delete_naissance = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_naissance()
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

  after_add(event: any) {
    if (event.status) {
      this.les_naissances.unshift(event.naissance)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_naissances[this.les_naissances.indexOf(this.naissance_to_edit)]=params.new_data
  }
  voir_plus(one_naissance: any) {
    this.selected_naissance = one_naissance
  }
  on_click_edit(one_naissance: any) {
    this.naissance_to_edit = one_naissance
  }
  on_close_modal_edit(){
    this.naissance_to_edit=undefined
  }
  delete_naissance (naissance : any){
    this.loading_delete_naissance = true;
    this.api.taf_post("naissance/delete", naissance,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table naissance . Réponse = ",reponse)
        this.get_naissance()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table naissance  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_naissance = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_naissance = false;
    })
  }
}