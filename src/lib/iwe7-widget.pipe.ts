import { Iwe7WIdgetModal } from './iwe7-widget.model';
import { Observable } from 'rxjs';
import { Iwe7WidgetsService } from './iwe7-widgets.service';
import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'iwe7Widget'
})
export class Iwe7WidgetPipe implements PipeTransform {

  constructor(
    public widgets: Iwe7WidgetsService
  ) { }
  transform(value: Iwe7WIdgetModal[], args?: any): Iwe7WIdgetModal[] {
    if (!value) {
      return [];
    }
    const ress = [];
    value.map(val => {
      val.selector = val.selector || val.name;
      ress.push({
        element: val.isLazy ? this.widgets.getLazy(val.script, val.selector) : this.widgets.get(val.name),
        ...val
      });
    });
    return ress;
  }

}
