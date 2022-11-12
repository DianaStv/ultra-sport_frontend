import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe';
import { CategoryTitle, ProductTitle, SexTitle } from 'src/app/shared/configs';
import { ICategory } from 'src/app/shared/interfaces';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent extends Unsubscribe implements OnInit {

  categories: ICategory[];
  loading: boolean = true;

  sex: string = '';
  category: string = '';
  product: string = '';

  params: any = {
    limit: 4,
    offset: 0,
    length: 0,
    sex: '',
    category: '',
    product: '',
    name: ''
  }

  constructor(
    private categoryService: CategoryService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['sex']) {
        this.params.sex = params['sex'];
        this.sex = (SexTitle as any)[params['sex']];
      }
      if (params['category']) {
        this.params.category = params['category'];
        this.category = (CategoryTitle as any)[params['category']];
      }
      if (params['product']) {
        this.params.product = params['product'];
        this.product = (ProductTitle as any)[params['product']];
      }
      this.loadCategories();
    });
  }

  searchByInput(input: string) {
    this.params.name = input || '';
    this.params.offset = 0;
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.categoryService.getAll(this.params)
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

  openAddPage() {
    this.router.navigate(['/categories/create-new']);
  }

  editCategory(id: string) {
    this.router.navigate([`/categories/${id}`]);
  }

  deleteCategory(id: string) {
    this.categoryService.delete(id)
    .pipe(
      takeUntil(this.destroy)
    )
    .subscribe(
      res => {
        this.loadCategories();
        this.commonService.callMatSnackBar(res.message)
      },
      err => this.commonService.callMatSnackBar(err.error.message)
    )
  }

  changePage(event: PageEvent) {
    this.params.offset = event.pageIndex;
    this.loadCategories();
  }

  disabledItem(category: ICategory): boolean {
    return category.sizes.filter(item => item.amount > 0).length === 0;
  }
}
