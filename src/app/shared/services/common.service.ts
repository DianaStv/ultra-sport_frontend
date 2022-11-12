import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  sidenavOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private snackBar: MatSnackBar
  ) {}

  callMatSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
      panelClass: 'black-snack-bar'
    });
  }
}
