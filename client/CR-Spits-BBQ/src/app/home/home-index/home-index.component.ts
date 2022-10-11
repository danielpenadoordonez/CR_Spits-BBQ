import { Component, OnInit } from '@angular/core';
import { LoadScriptsService } from 'src/app/share/load-scripts.service';


@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.css']
})
export class HomeIndexComponent implements OnInit {
  scripts = ['swiper-bundle.min.js', 'home.js'];
  
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
