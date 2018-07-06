import { Iwe7WidgetEventService } from './../iwe7-widget-event.service';
import { Iwe7WidgetTargetService } from './../iwe7-widget-target.service';
import { HostBinding, Input, Output, EventEmitter, HostListener } from '@angular/core';
export class Iwe7Widget {
    // 唯一标示
    _id: string;
    @Input()
    @HostBinding('attr.id')
    get id() {
        return this._id;
    }
    set id(val: string) {
        this._id = val;
        this.iwe7WidgetTargetService.set(val, this);
    }
    // 调试
    @Input() debug: boolean = false;

    // 输出
    @Output() iClick: EventEmitter<any> = new EventEmitter();
    @HostListener('click', ['$event'])
    _iClick(e: any) {
        this.iClick.emit(e);
    }
    constructor(
        public iwe7WidgetEventService: Iwe7WidgetEventService,
        public iwe7WidgetTargetService: Iwe7WidgetTargetService
    ) { }
}
