import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { SecurityService } from 'src/app/share/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(public securityService: SecurityService, private authService: AuthenticationService, private router: Router) {

  }

  ngOnInit(): void {
    this.isAuthenticated = this.securityService.isAuthenticated;
    window.addEventListener('scroll', this.onScroll);
  }

  login(): void {
    this.securityService.isAuthenticated = true;
    this.isAuthenticated = this.securityService.isAuthenticated;
    this.router.navigate(['./users/login']);
  }

  logout() : void{
      this.authService.logout();
      this.router.navigate(['users/login']);
  }

  onScroll() {
    let footer = document.querySelector('footer');
    let navSocial = document.querySelector('.nav-social-media');
    let body = document.querySelector('.principal-body') as HTMLElement;
    // si la posicion scroll en Y de la pantalla es menor o igual a la altura del nav mas la 
    // altura doble del footer añade margin top al nav si no ya lo detiene
    // NOTA: ESTO SIMULA EL POSITION FIXED, PERO LA PROPIEDAD FIXED NO RESPONDE ANTES MARGENES
    // POR ESO SE USA EN CAMBIO POSITION ABSOLUTE QUE SI RESPONDE ANTE MARGENES

    if (window.scrollY <= body.offsetHeight - footer.offsetHeight * 2 - 150){ // EL 150 es un margen para detenerse antes de tiempo
      (navSocial as HTMLElement).style.marginTop = `${window.scrollY}px`
    }

    if(window.scrollY > 100){
      document.querySelector('header').classList.add('scrolling-header');
    }else{
      document.querySelector('header').classList.remove('scrolling-header');
    }
  }
}
