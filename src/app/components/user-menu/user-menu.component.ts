import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public self: MatDialogRef<UserMenuComponent>,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.self.close();
  }

}
