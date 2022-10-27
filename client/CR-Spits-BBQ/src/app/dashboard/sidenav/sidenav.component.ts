import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { SecurityService } from 'src/app/share/security.service';
import { navbarData } from './nav-data';

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
  screenWidth = 0;
  navData = navbarData;

  //usuario conectado
  user: any;
  destroy$:Subject<boolean>= new Subject<boolean>();

  constructor(private userService: SecurityService, 
    private router: Router, 
    private gService: GenericService) { }

  @HostListener('window:resize', ['$event'])
  onResize(){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    // este método se tiene que cambiar más adelante
    this.user = this.userService.getUserLogged('208320565').subscribe((data:any) => {
      this.user = data;
    });
  }

  toggleCollapsed(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  closeCollapsed(){
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  Logout(){
    this.router.navigate(['/']);
  }
}
