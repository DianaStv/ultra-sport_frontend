import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISize } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-size-button',
  templateUrl: './size-button.component.html',
  styleUrls: ['./size-button.component.scss']
})
export class SizeButtonComponent implements OnInit {

  @Input() size: ISize = null;
  @Input() selected: boolean = false;
  @Output() addSize: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  add(event: Event) {
    this.addSize.emit(this.size);
  }

}
