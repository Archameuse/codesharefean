import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { EMPTY, Observable, catchError, map } from "rxjs";
import { FetchService } from "./services/fetch.service";

export const fetchResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
    const fetchService = inject(FetchService)
    const router = inject(Router)
    const {id} = route.params
    if(!id) return EMPTY
    return fetchService.getCodes(id).pipe(map(res => {
        if(res) return res
        router.navigate([''])
        return EMPTY
    }), catchError((err,caught) => {
        router.navigate([''])
        return EMPTY
    }))
}