import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  isAuthenticated: boolean = false;
  constructor() {}
}
