import { Component, OnInit } from '@angular/core';
import { LoadScriptsService } from 'src/app/share/load-scripts.service';

@Component({
  selector: 'app-static-animation',
  templateUrl: './static-animation.component.html',
  styleUrls: ['./static-animation.component.css']
})
export class StaticAnimationComponent implements OnInit {

  // Arreglo con las rutas de los scripts que se cargarán en este componente
  scripts = ['sparks.js'];
  constructor(private scriptService: LoadScriptsService) {
    this.scripts.forEach(element => {
      this.scriptService.loadScript(element, element);
    });
  }

  ngOnInit(): void {

  }

}
