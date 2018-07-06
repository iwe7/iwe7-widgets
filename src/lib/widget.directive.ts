import { Iwe7WidgetEventService } from './iwe7-widget-event.service';
import { Iwe7WIdgetModal } from './iwe7-widget.model';
import { Directive, Input, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[widget]'
})
export class WidgetDirective implements OnInit {
  @Input() widget: Iwe7WIdgetModal;
  constructor(
    public ele: ElementRef,
    public iwe7WidgetEventService: Iwe7WidgetEventService
  ) { }

  ngOnInit() {
    this.widget.element.subscribe((element: HTMLElement) => {
      const debug = this.widget.debug;
      element['debug'] = debug;
      const id = this.widget.id;
      element['id'] = id;
      // 属性
      const inputs = this.widget.inputs;
      console.log(inputs['selectable']);
      for (const key in inputs) {
        element[key] = inputs[key];
      }
      // 样式
      const className = this.widget.className;
      for (const key in className) {
        element[key] = className[key];
        if (className[key]) {
          element.classList.add(key);
        } else {
          if (element.classList.contains(key)) {
            element.classList.remove(key);
          }
        }
      }
      // 内容
      const contents = this.widget.contents;
      for (const key in contents) {
        element[key] = contents[key];
      }
      // 内联样式
      const style = this.widget.style;
      for (const key in style) {
        element.style[key] = style[key];
      }
      // outputs
      const outputs = this.widget.outputs;
      for (const key in outputs) {
        element.addEventListener(key, (e: any) => {
          const event = outputs[key];
          event.customEvent = e;
          this.iwe7WidgetEventService.exec(event, this.widget.debug);
        });
      }
      const nativeElement: HTMLElement = this.ele.nativeElement;
      nativeElement.parentElement.insertBefore(element, nativeElement);
    });
  }

  console(e: any, params: any) { }
}
