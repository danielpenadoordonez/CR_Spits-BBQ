import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.css']
})
export class DashboardBodyComponent implements OnInit {

  @Input() collapsed: boolean = false;
  @Input() screenWidth: number = 0;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(['dashboard/main'])
  }

  getBodyClass(): string {
    let styleClass;
    if(this.screenWidth <= 568 && this.screenWidth > 0){
      styleClass = 'body-full-screen'
    }else if (this.collapsed && this.screenWidth > 768) {
      styleClass = "body-trimmed";
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = "body-md-screen";
    }
    return styleClass;
  }
}
