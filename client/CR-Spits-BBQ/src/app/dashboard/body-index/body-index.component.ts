import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-body-index',
  templateUrl: './body-index.component.html',
  styleUrls: ['./body-index.component.css']
})
export class BodyIndexComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  statisticData = [];
  constructor(private gService: GenericService) { }

  ngOnInit(): void {
    this.getStatisticsData('users', 'Usuarios', 'person');
    this.getStatisticsData('mesas', 'Mesas', 'table_restaurant');
    this.getStatisticsData('productos', 'Productos', 'fastfood');
    this.getStatisticsData('pedidos', 'Comandas', 'edit_note');
  }

  getStatisticsData(URL:string, statisticType:string, icon:string){
    return this.gService
      .list(URL)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any) => {
          this.pushStatisticData(data.length, statisticType, icon);
      })
  }

  pushStatisticData(qty:number, statisticType:string, icon:string){
    this.statisticData.push({
      description: statisticType,
      icon: icon,
      qty: qty
    })
  }

}
