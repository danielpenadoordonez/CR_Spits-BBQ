import { Component, OnInit } from '@angular/core';
import { LoadScriptsService } from 'src/app/share/load-scripts.service';

@Component({
  selector: 'app-acerca-de-index',
  templateUrl: './acerca-de-index.component.html',
  styleUrls: ['./acerca-de-index.component.css']
})
export class AcercaDeIndexComponent implements OnInit {

  scripts = ['scrollreveal.min.js'];

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
