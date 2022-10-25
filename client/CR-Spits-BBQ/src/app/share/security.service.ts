import { Injectable } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  destroy$: Subject<boolean> = new Subject<boolean>();
  isAuthenticated: boolean = false;
  user: any;
  constructor(private gService: GenericService) {
  }

  getUserLogged(id: string): any {
    return this.gService
      .get('users', id)
      .pipe(takeUntil(this.destroy$));

  }
}
