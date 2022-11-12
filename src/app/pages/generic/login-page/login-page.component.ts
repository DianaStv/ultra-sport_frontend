import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends Unsubscribe implements OnInit {

  public form!: FormGroup;

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if(params['accessDenied']) {
        const message: string = 'You need to authenticate into a system';
        this.commonService.callMatSnackBar(message);
      } else if (params['sessionExpired']) {
        const message: string = 'Your session expired';
        this.commonService.callMatSnackBar(message);
      }
    });
  }

  onSubmit() {
    this.form.disable();

    this.authService.login(this.form.value)
    .pipe(
      takeUntil(this.destroy)
    )
    .subscribe(
      res => {
        this.router.navigate(['/history']);
      },
      err => {
        this.commonService.callMatSnackBar(err.error.message);
        this.form.enable();
      }
    );
  }

}
