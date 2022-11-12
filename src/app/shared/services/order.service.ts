import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { IOrder, IOrderResponse } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  reservedOrders: any = [];
  reservedOrders$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {
    this.getOrder();
  }

  getAll(params: any = {}): Observable<IOrderResponse> {
    return this.http.get<IOrderResponse>('/api/order', {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  getById(id: string): Observable<IOrder> {
    return this.http.get<IOrder>(`/api/order/${id}`);
  }

  create(order: IOrder): Observable<IOrder> {
    this.updateOrder([]);
    return this.http.post<IOrder>(`/api/order`, order);
  }

  addOrder(data: any) {
    this.reservedOrders.push(data);
    this.reservedOrders$.next(this.reservedOrders);
    localStorage.setItem('card', JSON.stringify(this.reservedOrders));
  }

  updateOrder(data: any) {
    this.reservedOrders = data;
    this.reservedOrders$.next(this.reservedOrders);
    localStorage.setItem('card', JSON.stringify(this.reservedOrders));
  }

  getOrder() {
    this.reservedOrders = JSON.parse(localStorage.getItem('card')) || [];
    this.reservedOrders$.next(this.reservedOrders);
    return this.reservedOrders;
  }

}
