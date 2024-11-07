import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-privilege',
  templateUrl: './list-privilege.component.html',
  styleUrls: ['./list-privilege.component.css']
})
export class ListPrivilegeComponent {
  loading_get_privilege = false
  les_privileges: any[] = []
  selected_privilege: any = undefined
  privilege_to_edit: any = undefined
  loading_delete_privilege = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_privilege()
  }
  get_privilege() {
    this.loading_get_privilege = true;
    this.api.taf_post("privilege/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_privileges = reponse.data
        console.log("Opération effectuée avec succés sur la table privilege. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table privilege a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_privilege = false;
    }, (error: any) => {
      this.loading_get_privilege = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_privileges.unshift(event.privilege)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_privileges[this.les_privileges.indexOf(this.privilege_to_edit)]=params.new_data
  }
  voir_plus(one_privilege: any) {
    this.selected_privilege = one_privilege
  }
  on_click_edit(one_privilege: any) {
    this.privilege_to_edit = one_privilege
  }
  on_close_modal_edit(){
    this.privilege_to_edit=undefined
  }
  delete_privilege (privilege : any){
    this.loading_delete_privilege = true;
    this.api.taf_post("privilege/delete", privilege,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table privilege . Réponse = ",reponse)
        this.get_privilege()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table privilege  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_privilege = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_privilege = false;
    })
  }
}