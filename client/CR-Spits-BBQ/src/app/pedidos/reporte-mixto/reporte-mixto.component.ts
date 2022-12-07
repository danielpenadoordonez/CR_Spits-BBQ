import { AfterViewInit, Component } from '@angular/core';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notification.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reporte-mixto',
  templateUrl: './reporte-mixto.component.html',
  styleUrls: ['./reporte-mixto.component.css']
})
export class ReporteMixtoComponent implements AfterViewInit {
  //* Instalación de jspdf y html2canvas
  //* npm install jspdf@14.2.4 html2canvas@14.2.4 --save
  
  currentUser: any;
  isAuthenticated: boolean = false;

  constructor(private gService: GenericService,
    private authService: AuthenticationService,
    private notification: NotificacionService
  ) { }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
    //* Cargamos al usuario logeado, ya que sí tiene seguridad pá, leer enunciado
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuthenticated = valor)
    );
  }


}
