import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first, forkJoin, Observable, of, switchMap, takeUntil, tap } from 'rxjs';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe';
import { ICategory, IOrder, IOrderPosition } from 'src/app/shared/interfaces';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent extends Unsubscribe implements OnInit {

  order: IOrder;
  categories: ICategory[] = [];
  loading: boolean = false;

  constructor(
    private orderService: OrderService,
    private categoryService: CategoryService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params
    .pipe(
      takeUntil(this.destroy),
      switchMap((params: Params) => {
        if(params['id']) {
          this.loading = true;
          return this.loadOrder(params['id']);
        }
        return of(null);
      })
    )
    .subscribe(
      () => {
        this.loading = false;
      },
      err => {
        this.commonService.callMatSnackBar(err.error.message);
        this.loading = false;
      }
    )
  }

  loadOrder(id: string): Observable<ICategory[]> {
    return this.orderService.getById(id)
      .pipe(
        switchMap((order: IOrder) => {
          this.order = order;
          return this.loadCategories(order.list);
        })
      )
  }

  loadCategories(orderList: IOrderPosition[]): Observable<ICategory[]> {
    return forkJoin(
      orderList.map(item => this.categoryService.getById(item.categoryId)
        .pipe(
          first(),
          tap(category => {
            this.categories.push(category);
          })
        )
      )
    )
  }

  getCategory(id: string): ICategory {
    return this.categories.find(category => category._id === id);
  }

  getSize(id: string, category: ICategory): string {
    return category.sizes.find(size => size._id === id).size;
  }

  back() {
    history.back();
  }

}
