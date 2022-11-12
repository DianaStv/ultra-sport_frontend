import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { OrderService } from 'src/app/shared/services/order.service';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sidenavOpened: boolean;
  ordersAmount$: Observable<any>;

  constructor(
    private commonService: CommonService,
    private orderService: OrderService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sidenavOpened = this.commonService.sidenavOpened$.value;
    this.ordersAmount$ = this.orderService.reservedOrders$;
  }

  changeSidenavState() {
    this.sidenavOpened = !this.sidenavOpened;
    this.commonService.sidenavOpened$.next(this.sidenavOpened);
  }

  openOrderPage() {
    this.router.navigate(['/basket']);
  }

  openUserMenu() {
		const dialogConfig: MatDialogConfig = new MatDialogConfig();
		dialogConfig.width = '126px';
		dialogConfig.position = { top: '44px', right: '80px' };
    dialogConfig.panelClass = 'black-dialog';
		this.dialog.open(UserMenuComponent, dialogConfig);
	}


}
