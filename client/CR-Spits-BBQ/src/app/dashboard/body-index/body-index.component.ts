import { ThisReceiver } from '@angular/compiler';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { Scroll } from '../../../assets/ts/scrollreveal';

@Component({
  selector: 'app-body-index',
  templateUrl: './body-index.component.html',
  styleUrls: ['./body-index.component.css']
})
export class BodyIndexComponent implements OnInit, AfterViewChecked {

  destroy$: Subject<boolean> = new Subject<boolean>();
  statisticData = [];
  dataLoaded: boolean = false;
  constructor(private gService: GenericService) { }

  ngAfterViewChecked(): void {
    this.setDelay();
  }

  ngOnInit(): void {
    this.initStatistics();
  }

  getStatisticsData(URL: string, statisticType: string, icon: string) {
    return this.gService
      .list(URL)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.pushStatisticData(data.length, statisticType, icon);
      })
  }

  pushStatisticData(qty: number, statisticType: string, icon: string) {
    this.statisticData.push({
      description: statisticType,
      icon: icon,
      qty: qty
    })
  }

  initStatistics() {
    this.getStatisticsData('users', 'Usuarios', 'person');
    this.getStatisticsData('mesas', 'Mesas', 'table_restaurant');
    this.getStatisticsData('productos', 'Productos', 'fastfood');
    this.getStatisticsData('pedidos', 'Comandas', 'edit_note');
  }

  setDelay() {
    let delay = .1;
    let items = Array.from( document.getElementsByClassName("statistic-card") as HTMLCollectionOf<HTMLElement>);
    items.forEach(item => { item.style.transitionDelay = `${delay}s`; delay += .1})
  }
}
