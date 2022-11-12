import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './pages/admin/orders-page/basket/basket.component';
import { CategoriesPageComponent } from './pages/admin/categories-page/categories-page.component';
import { CreateCategoryComponent } from './pages/admin/categories-page/create-category/create-category.component';
import { HistoryPageComponent } from './pages/admin/history-page/history-page.component';
import { CreateOrderComponent } from './pages/admin/orders-page/create-order/create-order.component';
import { OrdersPageComponent } from './pages/admin/orders-page/orders-page.component';
import { LoginPageComponent } from './pages/generic/login-page/login-page.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { OrderInfoComponent } from './pages/admin/history-page/order-info/order-info.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'history', component: HistoryPageComponent },
      { path: 'history/:id', component: OrderInfoComponent },
      { path: 'order', component: OrdersPageComponent },
      { path: 'order/:id', component: CreateOrderComponent },
      { path: 'basket', component: BasketComponent },
      { path: 'categories', component: CategoriesPageComponent },
      { path: 'categories/create-new', component: CreateCategoryComponent },
      { path: 'categories/:id', component: CreateCategoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
