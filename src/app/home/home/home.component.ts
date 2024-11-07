import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApiService } from '../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private renderer: Renderer2, public api: ApiService, private route: Router) {}

  ngOnInit(): void {
    this.api.custom_menu();
    this.setupSidebarToggle();
  }

  setupSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarNav = document.getElementById('layoutSidenav_nav');
    const content = document.getElementById('layoutSidenav_content');

    if (sidebarToggle && sidebarNav && content) {
      this.renderer.listen(sidebarToggle, 'click', () => {
        sidebarNav.classList.toggle('closed');
        content.classList.toggle('expanded');
      });
    } else {
      console.warn('L\'un des éléments nécessaires est manquant dans le DOM.');
    }
  }

  deconnecter() {
    // this.route.navigate(["/public/deconnexion"]);
  }
}
