import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of, switchMap, takeUntil } from 'rxjs';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe';
import { ICategory, ISize } from 'src/app/shared/interfaces';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent extends Unsubscribe implements OnInit {

  category: ICategory;
  selectedSize: ISize;
  loading: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    //load product with concrete id
    this.route.params
    .pipe(
      takeUntil(this.destroy),
      switchMap((params: Params) => {
        if(params['id']) {
          this.loading = true;
          return this.categoryService.getByIdFiltered(params['id']);
        }
        return of(null);
      })
    )
    .subscribe(
      (category: ICategory) => {
        this.category = category || null;
        this.loading = false;
      },
      err => {
        this.commonService.callMatSnackBar(err.error.message);
        this.loading = false;
      }
    )
  }

  selectSize(selectedSize: ISize) {
    if (selectedSize.amount === 0) return;
    this.selectedSize = selectedSize;
  }

  addOrder() {
    const data = {
      amount: 1,
      categoryId: this.category._id,
      sizeId: this.selectedSize._id
    }

    this.orderService.addOrder(data);
    this.selectedSize = null;
    this.commonService.callMatSnackBar('Замовлення додано');
  }

  back() {
    history.back();
  }

}
