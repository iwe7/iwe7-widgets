import { Observable } from 'rxjs';
import { Iwe7WIdgetModal } from './iwe7-widget.model';
import { Component, OnInit, Input, ɵisObservable } from '@angular/core';
@Component({
  selector: 'iwe7-widgets',
  templateUrl: './iwe7-widgets.component.html',
  styleUrls: ['./iwe7-widgets.component.scss']
})
export class Iwe7WidgetsComponent implements OnInit {
  isObservable: boolean = false;
  _schema: any;
  @Input()
  set schema(val: any) {
    if (val) {
      this.isObservable = ɵisObservable(val);
      this._schema = val;
    }
  }
  constructor() { }
  ngOnInit() { }
}
