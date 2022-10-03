import { Component, OnInit } from '@angular/core';
import { LoadScriptsService } from 'src/app/share/load-scripts.service';

@Component({
  selector: 'app-static-animation',
  templateUrl: './static-animation.component.html',
  styleUrls: ['./static-animation.component.css']
})
export class StaticAnimationComponent implements OnInit {

  scripts = ['../../assets/js/sparks.js'];

  constructor(private scriptService: LoadScriptsService) { 
    this.scripts.forEach(element => {
      this.scriptService.loadScript(element, element); 
  });
  }

  ngOnInit(): void {
  }

}
