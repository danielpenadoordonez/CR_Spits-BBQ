import { Component, OnInit } from '@angular/core';
import { LoadScriptsService } from 'src/app/share/load-scripts.service';

@Component({
  selector: 'app-development-team',
  templateUrl: './development-team.component.html',
  styleUrls: ['./development-team.component.css']
})
export class DevelopmentTeamComponent implements OnInit {

  // Arreglo con las rutas de los scripts que 
  //se cargarán en este componente
  // NOTA: IMPORTA MUCHO EL ORDEN
  scripts = ['about.js'];
  imgPath: string = '../../../assets/images/devTeam/';
  socialIcons = [
    {
      name: "Facebook",
      icon: "fa-brands fa-facebook",
    },
    {
      name: "Instagram",
      icon: "fa-brands fa-instagram",
    },
    {
      name: "Twitter",
      icon: "fa-brands fa-twitter"
    },
    {
      name: "Linkedin",
      icon: "fa-brands fa-linkedin"
    }
  ]

  // Arreglo con los integrantes de desarrollo
  devTeam: Array<any> = [
    // =========================================================
    // ========================= Isaac =========================
    // =========================================================
    {
      name: 'Isaac Barquero Lizano',
      photo: this.imgPath + 'Isaac.png',
      socialmedia: [ // Redes de Isaac
        {
          icon: this.socialIcons[0],
          url: 'https://www.facebook.com/profile.php?id=100006775756732'
        },
        {
          icon: this.socialIcons[1],
          url: 'https://www.instagram.com/isaacbar1026/'
        },
        {
          icon: this.socialIcons[3],
          url: 'https://www.linkedin.com/in/isaac-barquero-lizano/'
        }
      ],
      about: 'Desarrollador front-end. Soy muy apasionado por mi trabajo, el trabajar sobre nuevas ideas y' +
                'descubrir el fabuloso mundo que ofrece las nuevas tecnologías. <br><br><br> 21 años de ' +
                'edad. <br><br><br>Correo: isaacbarquero22@gmail.com'
    },
    // =========================================================
    // ========================= Mario =========================
    // =========================================================
    {
      name: 'Mario Ballestero Campos',
      photo: this.imgPath + 'user.png',
      socialmedia: [ // Redes de Mario
        {
          icon: this.socialIcons[1],
          url: "#"
        },
        {
          icon: this.socialIcons[2],
          url: "#"
        }
      ],
      about: 'Acerca de ti.'
    },

    // =========================================================
    // ========================= Daniel ========================
    // =========================================================
    {
      name: 'Daniel Penado Ordonez',
      photo: this.imgPath + 'daniel.png', 
      socialmedia: [ // Redes de Mario
        {
          icon: this.socialIcons[1],
          url: "#"
        },
        {
          icon: this.socialIcons[3],
          url: "#"
        }
      ],
      about: 'Acerca de ti.'
    }
   ]

  private sService: LoadScriptsService;
  constructor(private scriptService: LoadScriptsService) {
    this.sService = scriptService;
  }

    ngOnInit(): void {
    this.scripts.forEach(element => {
       this.sService.loadScript(element, element);
    });
    
  } 
} 