import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
