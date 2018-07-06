import { Iwe7WidgetTargetService } from './iwe7-widget-target.service';
import { Injectable } from '@angular/core';
export interface Iwe7WidgetEvent {
    method: string;
    params: any;
    target: any;
    customEvent: CustomEvent;
}
@Injectable({
    providedIn: 'root'
})
export class Iwe7WidgetEventService {
    map: Map<string, (val: any) => any> = new Map();
    constructor(
        public targets: Iwe7WidgetTargetService
    ) { }
    exec(event: Iwe7WidgetEvent, debug: boolean) {
        if (debug) {
            console.log('调用对象', event.target);
            console.log('调用方法', event.method);
            console.log('调用参数', event.params);
            console.log('触发事件', event.customEvent);
        }
        const target = this.targets.get(event.target);
        if (target) {
            if (debug) {
                console.log('调用实例', target);
            }
            const method = target[event.method];
            if (method) {
                method.call(target, event);
            }
        } else {
            console.log('调用对象不存在');
        }
    }

    set(name: string, callback: (val: any) => any) {
        this.map.set(name, callback);
    }
}
