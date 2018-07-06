import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Iwe7WidgetTargetService {
    map: Map<string, any> = new Map();
    constructor() { }

    set(name: string, item: any) {
        this.map.set(name, item);
    }

    get(name: string) {
        return this.map.get(name);
    }
}
