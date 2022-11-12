import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-size-block',
  templateUrl: './size-block.component.html',
  styleUrls: ['./size-block.component.scss']
})
export class SizeBlockComponent implements OnInit {

  @Input() size: string = null;
  @Input() amount: number = null;

  constructor() { }

  ngOnInit(): void {
  }

}
