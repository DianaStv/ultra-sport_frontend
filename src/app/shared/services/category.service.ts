import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ICategory, ICategoryResponse, IMessage, ISize } from "../interfaces";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) {
  }

  getAll(params: any = {}): Observable<ICategoryResponse> {
    return this.http.get<ICategoryResponse>('/api/category', {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  getAllFiltered(params: any = {}): Observable<ICategoryResponse> {
    return this.http.get<ICategoryResponse>('/api/category/filtered', {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  getById(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`/api/category/${id}`);
  }

  getByIdFiltered(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`/api/category/filtered/${id}`);
  }

  create(body: any): Observable<ICategory> {
    const fd = new FormData();
    fd.append('sex', body.sex);
    fd.append('category', body.category);
    fd.append('product', body.product);
    fd.append('name', body.name);
    fd.append('price', body.price);
    fd.append('code', body.code);
    fd.append('sizes', JSON.stringify(body.sizes));

    if(body.imageSrc) {
      fd.append('image', body.imageSrc, body.imageSrc.name);
    }
    return this.http.post<ICategory>('/api/category', fd);
  }

  update(body: any, id: string): Observable<ICategory> {
    const fd = new FormData();
    fd.append('sex', body.sex);
    fd.append('category', body.category);
    fd.append('product', body.product);
    fd.append('name', body.name);
    fd.append('price', body.price);
    fd.append('code', body.code);
    fd.append('sizes', JSON.stringify(body.sizes));

    if(body.imageSrc) {
      fd.append('image', body.imageSrc, body.imageSrc.name);
    }
    return this.http.patch<ICategory>(`/api/category/${id}`, fd);
  }

  delete(id: string): Observable<IMessage> {
    return this.http.delete<IMessage>(`/api/category/${id}`);
  }
}
