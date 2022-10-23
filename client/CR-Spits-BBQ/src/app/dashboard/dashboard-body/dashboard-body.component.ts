import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.css']
})
export class DashboardBodyComponent implements OnInit {

  @Input() collapsed: boolean = false;
  @Input() screenWidth: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getBodyClass(): string {
    let styleClass;
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = "body-trimmed";
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = "body-md-screen";
    }
    return styleClass;
  }
}
