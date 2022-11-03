import { Component, OnInit } from '@angular/core';
import { LoadScriptsService } from 'src/app/share/load-scripts.service';


@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.css']
})
export class HomeIndexComponent implements OnInit {
  scripts = ['swiper-bundle.min.js', 'home.js'];
  
  constructor(private scriptService: LoadScriptsService) {
  }

  ngOnInit(): void {
    this.scripts.forEach(element => {
       this.scriptService.loadScript(element, element);

    });
  }
}
