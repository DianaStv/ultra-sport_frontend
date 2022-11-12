import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginPageComponent } from './pages/generic/login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryPageComponent } from './pages/admin/history-page/history-page.component';
import { OrdersPageComponent } from './pages/admin/orders-page/orders-page.component';
import { CategoriesPageComponent } from './pages/admin/categories-page/categories-page.component';
import { LeftSidenavComponent } from './components/left-sidenav/left-sidenav.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SizeBlockComponent } from './components/size-block/size-block.component';
import { CreateCategoryComponent } from './pages/admin/categories-page/create-category/create-category.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenIntercepter } from './shared/interceptors/token.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { CreateOrderComponent } from './pages/admin/orders-page/create-order/create-order.component';
import { SizeButtonComponent } from './components/size-button/size-button.component';
import { BasketComponent } from './pages/admin/orders-page/basket/basket.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { AmountBlockComponent } from './components/amount-block/amount-block.component';
import { OrderInfoComponent } from './pages/admin/history-page/order-info/order-info.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    AdminLayoutComponent,
    HistoryPageComponent,
    OrdersPageComponent,
    CategoriesPageComponent,
    LeftSidenavComponent,
    SearchInputComponent,
    SizeBlockComponent,
    SizeButtonComponent,
    CreateCategoryComponent,
    LoaderComponent,
    CreateOrderComponent,
    BasketComponent,
    UserMenuComponent,
    AmountBlockComponent,
    OrderInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatDialogModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenIntercepter
    },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
