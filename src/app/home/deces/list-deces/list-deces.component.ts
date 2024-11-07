import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-deces',
  templateUrl: './list-deces.component.html',
  styleUrls: ['./list-deces.component.css']
})
export class ListDecesComponent {
  loading_get_deces = false
  les_decess: any[] = []
  selected_deces: any = undefined
  deces_to_edit: any = undefined
  loading_delete_deces = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_deces()
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

  after_add(event: any) {
    if (event.status) {
      this.les_decess.unshift(event.deces)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_decess[this.les_decess.indexOf(this.deces_to_edit)]=params.new_data
  }
  voir_plus(one_deces: any) {
    this.selected_deces = one_deces
  }
  on_click_edit(one_deces: any) {
    this.deces_to_edit = one_deces
  }
  on_close_modal_edit(){
    this.deces_to_edit=undefined
  }
  delete_deces (deces : any){
    this.loading_delete_deces = true;
    this.api.taf_post("deces/delete", deces,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table deces . Réponse = ",reponse)
        this.get_deces()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table deces  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_deces = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_deces = false;
    })
  }
}