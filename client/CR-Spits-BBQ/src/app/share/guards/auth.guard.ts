import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    //* Variables
    isAuthenticated: boolean;
    currentUser: any;

    constructor(private authService: AuthenticationService,
        private router: Router) {

        //* Subscribirse para obtener si esta autenticado
        this.authService.isAuthenticated.subscribe(
            (valor) => (this.isAuthenticated = valor)
        );

        //* Subscribirse para obtener el usuario autenticado
        this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,

    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let url: string = state.url;
        return this.checkUserLogin(route, url);
    }

    //* Verificar que el rol del usuario coincida
    //* con alguno de los indicados
    //? Pendiente a cambios
    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        if (this.isAuthenticated) {
            const userRole = this.currentUser.user.Perfil.descripcion;
            //* Esto viene de route, se valida en las rutas
            //* Se logeó pero no cumple el rol
            if (route.data['roles'].length && !route.data['roles'].includes(userRole)) {
                this.router.navigate(['/dashboard/main'], {
                    //? Parametro para mostrar mensaje en login - PUEDE CAMBIAR
                    queryParams: { auth: 'no'}
                });
                return false;
            }
            return true;
        }

        //* Redirigimos - no se ha logeado
        this.router.navigate(['/users/login'], {
            queryParams: { auth: 'no', register: 'no' }
        });
        return false;
    }
}
