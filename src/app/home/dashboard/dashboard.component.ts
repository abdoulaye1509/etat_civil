import { Component } from '@angular/core';
 import { Chart} from 'chart.js/auto'
import { ApiService } from '../../service/api/api.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  chart: any;

  constructor(public api: ApiService) { }

ngOnInit(): void {
     this.chart = new Chart(
       'MyChart5', // indetifiant du chart
//        configurations et données (2) du chart
     {
       type: 'bar',//this bar tha type of chart
       data: {// values on X-Axis
         labels:[2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024],
         datasets: [
           {
             label: "Nombre de Naissances/ ans",
             data:[50,35,45,30,50,35,45,30,50,35,45,30,22],
             backgroundColor: [
               'rgb(255, 99, 132)',
               'rgb(54, 162, 235)',
               'rgb(255, 205, 86)',
               'rgb(255, 99, 12)',
               'rgb(54, 162, 125)',
               'rgb(255, 205, 236)',
               'rgb(255, 99, 132)',
               'rgb(54, 162, 235)',
               'rgb(255, 205, 86)',
               'rgb(255, 99, 12)',
               'rgb(54, 162, 125)',
               'rgb(255, 205, 236)',
               'rgb(255, 205, 236)'
             ],
           }
         ]
       },
       options: {
         aspectRatio: 2.5,

         plugins: {
           title: {
             display: true,
             text: 'Statistiques'
           }

         }
       }

     }
   );
  // this.get_enfant();

}

creatChart(data:any) {
      let abs: any = data.map((objet_courant:any)=>{return objet_courant.prenom })
      let ord: any = data.map((objet_courant:any)=>{return objet_courant.date_naissance})
      if(this.chart){
       this.chart.destroy()
      }
      this.chart = new Chart(
        'MyChart5', // indetifiant du chart
//       configurations et données (2) du chart
      {
        type: 'bar',//this bar tha type of chart
        data: {// values on X-Axis
          labels: abs,
          datasets: [
            {
              label: "NAISSANCES",
              data: ord,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(255, 99, 12)',
                'rgb(54, 162, 125)',
                'rgb(255, 205, 236)'
              ],
            }
          ]
        },
        options: {
          aspectRatio: 2.5,

          plugins: {
            title: {
              display: true,
              text: 'liste des enfants'
            }

          }
        }

      }
    )
 }
}


