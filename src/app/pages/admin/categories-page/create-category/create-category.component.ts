import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, of, switchMap, takeUntil } from 'rxjs';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe';
import { categoryList, productList, sexList } from 'src/app/shared/configs';
import { ICategory, IList } from 'src/app/shared/interfaces';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent extends Unsubscribe implements OnInit {

  @ViewChild('load_image') loadImageRef: ElementRef;

  form: FormGroup;
  sizeForm: FormGroup;

  image: File;
  imagePreview: string | ArrayBuffer = '';

  categoryId: string = null;
  loading: boolean = false;

  sex: IList[] = sexList;
  category: IList[] = categoryList;
  product: IList[] = [];

  constructor(
    private categoryService: CategoryService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) {
    super()
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      sex: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      product: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      code: new FormControl('', [Validators.required, Validators.minLength(3)]),
      sizes: new FormArray([])
    });
    this.addSizeForm();

    // change products types for different categories
    this.form.controls['category'].valueChanges
    .pipe(
      takeUntil(this.destroy),
      filter(category => !!category)
    )
    .subscribe((category: string) => {
      this.product = (productList as any)[category]
    });

    //load product with concrete id
    this.route.params
    .pipe(
      takeUntil(this.destroy),
      switchMap((params: Params) => {
        if(params['id']) {
          this.loading = true;
          this.categoryId = params['id'];
          return this.categoryService.getById(params['id']);
        }
        return of(null);
      })
    )
    .subscribe(
      (category: ICategory) => {
        if (category) {
          for (let i = 0; i < category.sizes.length-1; i++) {
            this.addSizeForm()
          }
          this.form.patchValue(category);
          this.imagePreview = category.imageSrc;
        }
        this.form.enable();
        this.loading = false;
      },
      err => {
        this.commonService.callMatSnackBar(err.error.message);
        this.loading = false;
      }
    )
  }

  get sizes(): FormArray {
    return this.form.controls['sizes'] as FormArray;
  }

  get sizeForms(): FormGroup[] {
    return this.sizes.controls as FormGroup[];
  }

  triggerClick() {
    this.loadImageRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }

    reader.readAsDataURL(file);
  }

  addSizeForm() {
    this.sizeForm = new FormGroup({
      size: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(0)])
    });

    this.sizes.push(this.sizeForm);
  }

  deleteSizeForm(index: number) {
    if (this.sizeForms.length > 1) {
      this.sizes.removeAt(index);
    }
  }

  onSubmit() {
    const data = {
      ...this.form.value,
      imageSrc: this.image
    }

    this.form.disable();

    if (!this.categoryId) {
      this.categoryService.create(data)
      .pipe(
        takeUntil(this.destroy)
      )
      .subscribe(
        res => {
          this.commonService.callMatSnackBar('Товар був успішно доданий');
          this.form.enable();
          this.clear(this.form);
          this.image = null;
          this.imagePreview = null;
        },
        err => this.commonService.callMatSnackBar(err.error.message)
      );
    } else {
      this.categoryService.update(data, this.categoryId)
      .pipe(
        takeUntil(this.destroy)
      )
      .subscribe(
        res => {
          this.commonService.callMatSnackBar('Товар був успішно відредагований');
          this.form.enable();
        },
        err => this.commonService.callMatSnackBar(err.error.message)
      );
    }
  }

  clear(form: FormGroup): void {
    form.reset();
    Object.keys(form.controls).forEach(key =>{
       form.controls[key].setErrors(null)
    });
  }

  back() {
    history.back();
  }

}
