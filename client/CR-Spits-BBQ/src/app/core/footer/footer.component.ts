import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  // Lista con los links del footer
  footerLinks: any = [
    {
      title: "Principal",
      links: [
        {
          link: "#",
          description: "Inicio"
        },
        {
          link: "#",
          description: "Mesas"
        },
        {
          link: "#",
          description: "Inciar Sesión"
        },
      ]
    },
    {
      title: "Nuestro Servicio",
      links: [
        {
          link: "#",
          description: "Acerca de"
        },
        {
          link: "#",
          description: "Ayuda"
        },
        {
          link: "#",
          description: "Registro"
        },
      ]
    },
    {
      title: "Nuestra Empresa",
      links: [
        {
          link: "#",
          description: "Historia"
        },
        {
          link: "#",
          description: "Contacto"
        },
        {
          link: "#",
          description: "Ubicaciones"
        },
      ]
    },
  ]


  // Lista de social media del footer
  footerSocialMeida = [
    {
      link:'"ttps://www.facebook.com',
      icon: 'fa-brands fa-facebook'
    },
    {
      link:'"ttps://www.instagram.com',
      icon: 'fa-brands fa-instagram'
    },
    {
      link:'"ttps://www.twitter.com',
      icon: 'fa-brands fa-twitter'
    },
  ]
  // Fecha actual para el copyright
  dateNow: number;

  ngOnInit(): void {
    let footer = document.querySelector('footer');
    this.dateNow = new Date().getFullYear();
  }

}
