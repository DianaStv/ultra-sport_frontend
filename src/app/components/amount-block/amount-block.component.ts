import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-amount-block',
  templateUrl: './amount-block.component.html',
  styleUrls: ['./amount-block.component.scss']
})
export class AmountBlockComponent implements OnInit {

  @Output() addOne: EventEmitter<number> = new EventEmitter<number>();
  @Output() removeOne: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter<any>();

  @Input() amount: number = 1;
  @Input() maxAmount: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  delete() {
    this.deleteItem.emit();
  }

  add() {
    this.amount += 1;
    this.addOne.emit(this.amount);
  }

  remove() {
    this.amount -= 1;
    this.removeOne.emit(this.amount);
  }

}
