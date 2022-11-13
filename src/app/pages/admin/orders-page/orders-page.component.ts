import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe';
import { ICategory } from 'src/app/shared/interfaces';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent extends Unsubscribe implements OnInit {

  categories: ICategory[] = [];
  loading: boolean = false;

  params: any = {
    limit: 10,
    offset: 0,
    length: 0,
    code: ''
  }

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  searchByInput(input: string) {
    this.params.code = input || '';
    this.params.offset = 0;
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.categoryService.getAllFiltered(this.params)
    .pipe(
      takeUntil(this.destroy)
    )
    .subscribe(res => {
      this.categories = res.categories;
      this.params.length = res.length;
      this.params.limit = res.limit;
      this.params.offset = res.offset;

      this.loading = false;
    });
  }

  createOrder(id: string) {
    this.router.navigate([`/order/${id}`]);
  }

  changePage(event: PageEvent) {
    this.params.offset = event.pageIndex;
    this.loadCategories();
  }

}
