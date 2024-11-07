import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from '../../service/api/api.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule,RouterOutlet],
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent  {
  
  constructor(public api:ApiService){}

  }

