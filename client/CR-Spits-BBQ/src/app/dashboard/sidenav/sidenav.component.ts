import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { SecurityService } from 'src/app/share/security.service';
import { navbarData } from './nav-data';
import { Scroll } from '../../../assets/ts/scrollreveal';
import { AuthenticationService } from 'src/app/share/authentication.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  sidenavHidden = false;
  screenWidth = 0;
  navData = navbarData;

  //usuario conectado
  isAuthenticated: boolean;
  currentUser: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private authService: AuthenticationService,
    private router: Router,
    private gService: GenericService) { }


  //Evento que emite al dashboard-body como 
  // manejar el contenido al hacer resize y valida si ocultar o mostrar el sidenav 
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.validateSidenavScreenWidth();
    // Si el ancho de pantalla es menor o igual a 768px cierre el sidenav
    if (this.screenWidth <= 768) {
      this.closeCollapsed();
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
    } else {
      // Si el ancho de pantalla es mayor a 768px solo emita los parametros al hacer resize
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    // llama al metodo resize para validar de primera 
    // instancia como mostrar el contenido el body y el sidenav
    this.onResize();
    //Subscripci??n a la informaci??n del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    //Subscripci??n al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuthenticated = valor)
    );

  }

  ngAfterViewInit() {
    this.addNavItemDelay();
    this.setNavItemScrollReveal();
  }

  // Muestra u oculta el sidenav
  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.validateSidenavScreenWidth();
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
    this.toggleNavItem();
  }

  // Mueatra u oculta los textos de los elementos "<a>" de los items del sidenav 
  toggleNavItem() {
    document.querySelectorAll(".sidenav-link-text").forEach(item => {
      item.classList.toggle('quit-sidenav-link-text');
    })
  }

  // Quita todos los textos de los elementos "<a>" de los items del sidenav 
  closeeNavItem() {
    document.querySelectorAll(".sidenav-link-text").forEach(item => {
      item.classList.remove('quit-sidenav-link-text');
    })
  }

  // a??ade un retraso de animiaci??n
  // al mostrar u ocultar el texto de los links del Sidenav
  addNavItemDelay() {
    let delay = 0;
    let items = Array.from(document.getElementsByClassName("sidenav-link-text") as HTMLCollectionOf<HTMLElement>);
    items.forEach(item => { item.style.transitionDelay = `${delay}s`; delay += .025 })
  }

  // Oculta el sidenav parcial o totalmente
  closeCollapsed() {
    this.collapsed = false;
    this.validateSidenavScreenWidth();
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
    this.closeeNavItem();
  }

  // Cuando el ancho de la pantalla sea igual o menor a 576px
  // va a quitar el sidenav cada vez que se click a un link del
  // sidenav
  closeSideNavCollapsed(event: any) {
    if (this.screenWidth <= 576) {
      this.closeCollapsed();
    }
    this.setActiveElementItem(event);
  }

  // Muestra el menu lateral. Aplica solamente
  // cuando el ancho de la pantalla sea igual o menor a 576px
  openMenu() {
    this.sidenavHidden = false;
    this.collapsed = true;
    this.toggleNavItem();
  }

  // Cierra sesi??n del usuario actual
  Logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // Muestra los elementos del menu con un intervalo de 100ms cada uno
  setNavItemScrollReveal() {
    Scroll.reveal('.sidenav-nav-item', { interval: 100, origin: 'left' });
  }

  // set background on the active element
  setActiveElementItem(event: any){
    document.querySelectorAll('.nav-data .sidenav-nav-item .sidenav-nav-link').forEach(item => {
      item.classList.remove('active-item');
    })
    event.target.parentNode.classList.add('active-item');
  }

  // Cuando el ancho de la pantalla sea igual o menor a 576px oculta el sidenav 
  validateSidenavScreenWidth() {
    this.screenWidth <= 576 ? this.sidenavHidden = true : this.sidenavHidden = false;
  }

  // retorna el nombre y primer apellido del usuario conectado
  getUserFullName(): String{
    return `${this.currentUser.user.nombre} ${this.currentUser.user.apellido1}`;
  }

  isAllowRol(rol: string, rolesAllowed: any, label:string): boolean{
    let isValid = false;
    rolesAllowed.forEach(item => {
      if(item == rol){
        isValid = true;
      }
    })
    if(!isValid){
      document.getElementById(label).style.display = 'none';
    }
    return isValid;
  }
}
