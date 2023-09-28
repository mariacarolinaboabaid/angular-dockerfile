import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../shared/services/login.service';

export const authAcessPublic: CanActivateFn = (route, state) => {
  if (!inject(LoginService).loggedCheck()){
    return true
  } 
  else {
    return inject(Router).createUrlTree(['/error']);
  }
}


export const authAcessPrivate: CanActivateFn = (route, state) => {
  if (inject(LoginService).loggedCheck()) {
    return true
  }
  else {
    return inject(Router).createUrlTree(['/error'])
  }
}
