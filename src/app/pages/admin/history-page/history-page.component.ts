import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe';
import { IOrder, IOrderPosition } from 'src/app/shared/interfaces';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent extends Unsubscribe implements OnInit {

  displayedColumns: string[] = ['order', 'date', 'time', 'cost', 'open'];

  orders: IOrder[] = [];
  loading: boolean = false;

  params: any = {
    limit: 10,
    offset: 0,
    length: 0
  }

  orderForm: FormControl;
  dateGroup: FormGroup;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.orderForm = new FormControl('');
    this.dateGroup = new FormGroup({
      start: new FormControl(null),
      end: new FormControl(null),
    });

    this.orderForm.valueChanges.subscribe(value => {
      if(value) {
        this.params.order = value;
      } else {
        delete this.params.order;
      }
    });

    this.dateGroup.valueChanges.subscribe(value => {
      if(value.start) {
        this.params.start = value.start;
      } else {
        delete this.params.start;
      }

      if(value.end) {
        this.params.end = new Date(value.end.getTime() + (24 * 60 * 60 * 1000));
      } else {
        delete this.params.end;
      }
    });

    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getAll(this.params)
    .pipe(
      takeUntil(this.destroy)
    )
    .subscribe(res => {
      this.orders = res.orders;
      this.params.length = res.length;
      this.params.limit = res.limit;
      this.params.offset = res.offset;

      this.loading = false;
    });
  }

  computePrice(order: IOrder) {
    return order.list.reduce((total: number, item: IOrderPosition) => {
      return total += item.cost;
    }, 0)
  }

  openOrderInfo(order: IOrder) {
    this.router.navigate([`/history/${order._id}`]);
  }

  changePage(event: PageEvent) {
    this.params.offset = event.pageIndex;
    this.loadOrders();
  }

  applyFilters() {
    this.loadOrders();
  }
}
