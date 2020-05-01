import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-title-toolbar',
  templateUrl: './title-toolbar.component.html',
  styleUrls: ['./title-toolbar.component.scss']
})
export class TitleToolbarComponent {

  constructor() { }

  @Input() group: string;
  @Input() category: string;

  @Output() sort = new EventEmitter();

  emit(method: string) {
    this.sort.emit(method);
  }

}
