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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.validateSidenavScreenWidth();
    if (this.screenWidth <= 768) {
      this.closeCollapsed();
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.validateSidenavScreenWidth();
    // este método se tiene que cambiar más adelante
    this.user = this.userService.getUserLogged('208320565').subscribe((data: any) => {
      this.user = data;
    });
  }

  ngAfterViewInit() {
    this.addNavItemDelay();
    this.setNavItemScrollReveal();
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.validateSidenavScreenWidth();
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
    this.toggleNavItem();
  }

  toggleNavItem() {
    document.querySelectorAll(".sidenav-link-text").forEach(item => {
      item.classList.toggle('quit-sidenav-link-text');
    })
  }

  closeeNavItem() {
    document.querySelectorAll(".sidenav-link-text").forEach(item => {
      item.classList.remove('quit-sidenav-link-text');
    })
  }

  addNavItemDelay() {
    let delay = 0;
    let items = Array.from(document.getElementsByClassName("sidenav-link-text") as HTMLCollectionOf<HTMLElement>);
    items.forEach(item => { item.style.transitionDelay = `${delay}s`; delay += .025 })
  }

  closeCollapsed() {
    this.collapsed = false;
    this.validateSidenavScreenWidth();
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
    this.closeeNavItem();
  }

  openMenu(){
    this.sidenavHidden = false;
    this.collapsed = true;
    this.toggleNavItem();
  }

  Logout() {
    this.router.navigate(['/']);
  }

  setNavItemScrollReveal() {
    Scroll.reveal('.sidenav-nav-item', { interval: 100, origin: 'left' });
  }

  validateSidenavScreenWidth(){
    this.screenWidth <= 576 ? this.sidenavHidden = true : this.sidenavHidden = false;
  }
}
