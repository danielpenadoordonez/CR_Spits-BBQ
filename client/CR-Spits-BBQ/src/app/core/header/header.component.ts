import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/share/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(public securityService: SecurityService, private router: Router ) {
  
  }

  ngOnInit(): void {
    this.isAuthenticated = this.securityService.isAuthenticated;  
  }

  Loguear(): void{
    this.securityService.isAuthenticated = true;
    this.isAuthenticated = this.securityService.isAuthenticated;
    this.router.navigate(['./dashboard']);
  }
}
