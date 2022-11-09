import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { SecurityService } from 'src/app/share/security.service';
import { navbarData } from './nav-data';
import { Scroll } from '../../../assets/ts/scrollreveal';

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
  user: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: SecurityService,
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
    }else{
      // Si el ancho de pantalla es mayor a 768px solo emita los parametros al hacer resize
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    // llama al metodo resize para validar de primera 
    // instancia como mostrar el contenido el body y el sidenav
    this.onResize();
    // este método se tiene que cambiar más adelante
    this.user = this.userService.getUserLogged('208320565').subscribe((data: any) => {
      this.user = data;
    });
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

  // añade un retraso de animiación
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
  closeSideNavCollapsed(){
    if(this.screenWidth <= 576){
      this.closeCollapsed();
    }
  }

  // Muestra el menu lateral. Aplica solamente
  // cuando el ancho de la pantalla sea igual o menor a 576px
  openMenu(){
    this.sidenavHidden = false;
    this.collapsed = true;
    this.toggleNavItem();
  }

  // Cierra sesión del usuario actual
  Logout() {
    this.router.navigate(['/']);
  }

  // Muestra los elementos del menu con un intervalo de 100ms cada uno
  setNavItemScrollReveal() {
    Scroll.reveal('.sidenav-nav-item', { interval: 100, origin: 'left' });
  }

  // Cuando el ancho de la pantalla sea igual o menor a 576px oculta el sidenav 
  validateSidenavScreenWidth(){
    this.screenWidth <= 576 ? this.sidenavHidden = true : this.sidenavHidden = false;
  }
}
