import { createCustomElement } from '@angular/elements';
import { Observable, of } from 'rxjs';
import { NgModule, Injector } from '@angular/core';
import { Iwe7WidgetsComponent } from './iwe7-widgets.component';
import { CommonModule } from '@angular/common';
import { Iwe7WidgetPipe } from './iwe7-widget.pipe';
import { WidgetNotFoundComponent } from './widget-not-found/widget-not-found.component';
import { WidgetDirective } from './widget.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [Iwe7WidgetsComponent, Iwe7WidgetPipe, WidgetNotFoundComponent, WidgetDirective],
  exports: [Iwe7WidgetsComponent, Iwe7WidgetPipe, WidgetDirective],
  entryComponents: [WidgetNotFoundComponent]
})
export class Iwe7WidgetsModule {
  defined: Observable<any>;
  constructor(injector: Injector) {
    const ctrl = createCustomElement(WidgetNotFoundComponent, { injector });
    if (!customElements.get('widget-not-found')) {
      customElements.define('widget-not-found', ctrl);
    }
    this.defined = of(customElements.whenDefined('widget-not-found'));
  }
}
