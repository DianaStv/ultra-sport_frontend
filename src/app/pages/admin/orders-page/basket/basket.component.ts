import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, forkJoin, tap } from 'rxjs';
import { IOrder, IOrderItem } from 'src/app/shared/interfaces';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  orders: IOrderItem[] = [];
  loading: boolean = false;
  pending: boolean = false;

  check: any = {
    amount: 0,
    sum: 0
  }

  constructor(
    private orderService: OrderService,
    private categoryService: CategoryService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orders = [];
    const reservedOrders: any[] = this.orderService.getOrder();

    if (reservedOrders.length === 0) {
      this.loading = false;
      return;
    }

    forkJoin(
      reservedOrders.map((order: any) => this.categoryService.getById(order.categoryId)
        .pipe(
          first(),
          tap(category => {
            this.orders.push({
              category,
              size: category.sizes.find(size => size._id === order.sizeId),
              amount: order.amount
            });
            return category;
          })
        )
      )
    ).subscribe(() => {
      this.calculateCheck();
      this.loading = false;
    });
  }

  changeAmount(amount: number, index: number) {
    this.orders[index].amount = amount;
    this.updateOrders();
  }

  deleteOrder(index: number) {
    this.orders.splice(index, 1);
    this.updateOrders();
  }

  updateOrders() {
    const data = this.orders.map((order: any) => {
      return {
        amount: order.amount,
        categoryId: order.category._id,
        sizeId: order.size._id
      }
    });
    this.orderService.updateOrder(data);
    this.calculateCheck();
  }

  calculateCheck() {
    this.check.amount = this.orders.reduce((total: number, item: any) => {
      return total += item.amount;
    }, 0);

    this.check.sum = this.orders.reduce((total: number, item: any) => {
      return total += item.category.price * item.amount;
    }, 0);
  }

  goToShopping() {
    this.router.navigate(['/order']);
  }

  createOrder() {
    this.pending = true;

    const order: IOrder = {
      list: this.orders.map((order: any) => {
        return {
          amount: order.amount,
          cost: order.amount * order.category.price,
          categoryId: order.category._id,
          sizeId: order.size._id
        }
      })
    }

    this.orderService.create(order).subscribe(
      newOrder => {
        this.commonService.callMatSnackBar(`Замовлення №${newOrder.order} було додано`);
        this.loadOrders();
      },
      err => this.commonService.callMatSnackBar(err.error.message),
      () => this.pending = false
    );
  }
}
