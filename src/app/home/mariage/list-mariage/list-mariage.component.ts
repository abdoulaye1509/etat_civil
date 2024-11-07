import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-mariage',
  templateUrl: './list-mariage.component.html',
  styleUrls: ['./list-mariage.component.css']
})
export class ListMariageComponent {
  loading_get_mariage = false
  les_mariages: any[] = []
  selected_mariage: any = undefined
  mariage_to_edit: any = undefined
  loading_delete_mariage = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_mariage()
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

  after_add(event: any) {
    if (event.status) {
      this.les_mariages.unshift(event.mariage)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_mariages[this.les_mariages.indexOf(this.mariage_to_edit)]=params.new_data
  }
  voir_plus(one_mariage: any) {
    this.selected_mariage = one_mariage
  }
  on_click_edit(one_mariage: any) {
    this.mariage_to_edit = one_mariage
  }
  on_close_modal_edit(){
    this.mariage_to_edit=undefined
  }
  delete_mariage (mariage : any){
    this.loading_delete_mariage = true;
    this.api.taf_post("mariage/delete", mariage,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table mariage . Réponse = ",reponse)
        this.get_mariage()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table mariage  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_mariage = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_mariage = false;
    })
  }
}