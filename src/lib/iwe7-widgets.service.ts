import { ROUTES } from '@angular/router';
import { WidgetNotFoundComponent } from './widget-not-found/widget-not-found.component';
import {
  Injectable, Type, SystemJsNgModuleLoader,
  Inject, NgModuleFactory, Injector,
  ComponentFactory, ComponentRef,
  ComponentFactoryResolver
} from '@angular/core';
import { forkJoin, of, Observable, from } from 'rxjs';
import { tap, map, pluck, switchMap, catchError } from 'rxjs/operators';
import { flattenDeep } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class Iwe7WidgetsService {
  routerMap: Map<string, string> = new Map();
  constructor(
    public loader: SystemJsNgModuleLoader,
    @Inject(ROUTES) routes: any[],
    public injector: Injector,
    public resolver: ComponentFactoryResolver
  ) {
    const flattenRoutes = flattenDeep(routes);
    flattenRoutes.map(route => {
      this.routerMap.set(route.path, route.loadChildren);
    });
  }

  get(name: string): Observable<HTMLElement> {
    const ele = document.createElement(name);
    return of(ele);
  }

  getLazy(path: string, selector: string): Observable<HTMLElement> {
    const path2 = this.routerMap.get(path);
    if (path2) {
      return from(this.loader.load(path2)).pipe(
        switchMap((ngModuleFactory: NgModuleFactory<any>) => {
          return ngModuleFactory.create(this.injector).instance.defined;
        }),
        switchMap(res => {
          const ele = document.createElement(selector);
          return of(ele);
        })
      );
    } else {
      const ele = document.createElement('widget-not-found');
      return of(ele);
    }
  }
}
