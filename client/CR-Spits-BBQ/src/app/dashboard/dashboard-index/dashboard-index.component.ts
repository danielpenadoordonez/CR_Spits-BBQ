import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/share/security.service';
import { SidenavComponent } from '../sidenav/sidenav.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.css']
})
export class DashboardIndexComponent implements OnInit {

  isAuthenticated: boolean;
  screenWidth: number = 0;
  isSideNavCollapsed: boolean = false;

  constructor(private securityService: SecurityService ) {
    
  }

  ngOnInit(): void {
    this.isAuthenticated = this.securityService.isAuthenticated;
    this.hideNavbar();
  }

  hideNavbar() {
    document.getElementsByClassName('header')[0].classList.toggle('hide-nav');
  }

  ngOnDestroy(){
    this.hideNavbar();
  }

  onToggleSideNav(data: SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}