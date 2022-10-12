import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

//* De momento su función será mostrar la información del usuario en un dialog
export class UsuarioComponent implements OnInit {
  datos: any;
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private gService: GenericService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if (this.datosDialog.id) {
      this.obtenerUsuario(this.datosDialog.id);
    }
  }

  obtenerUsuario(id: string) {
    this.gService
      .get('user/', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }

}
