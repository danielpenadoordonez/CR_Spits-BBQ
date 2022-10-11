import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadScriptsService {

  PATH: string = '../../../assets/js/';
  constructor() { }

    loadScript(id: string, name: string) {
    return new Promise((resolve, reject) => {
      if (id && document.getElementById(id)) {
        resolve({ id: id, loaded: true, status: 'Already Loaded' });
        console.log(name + ', already loaded')
      }
      let body = document.body;
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = '';
      script.src = this.PATH + name;
      script.id = id;
      script.onload = () => {
        resolve({ id: id, loaded: true, status: 'Loaded' });
        console.log(name + ' Loaded')
      };
      script.onerror = (error: any) => resolve({ id: id, loaded: false, status: 'Loaded' });
      script.async = false;
      script.defer = true;
      body.appendChild(script);
    });
    
  }
}
