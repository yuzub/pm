import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
// import observable operators:
import 'rxjs/add/operator/catch'; // catch - for error handling
import 'rxjs/add/operator/do'; // do - for debugging
// import 'rxjs/add/operator/throw'; // throw - also for error handling
import 'rxjs/add/operator/map'; // map - to map the HTTP response to products

import { IProduct } from "./product";

@Injectable()
export class ProductService {
  private baseUrl = 'api/products';
  private _productUrl = './api/products/products.json';

  constructor(private _http: HttpClient,
    private http: Http) { }

  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(this._productUrl)
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      return Observable.create((observer: any) => {
        // observer.next(this.initializeProduct());
        observer.complete();
      });
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
      .map(this.extractData)
      .do(data => console.log('getProduct: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteProduct(id: number): Observable<Response> {
    return;
  }

  saveProduct(product: IProduct): Observable<IProduct> {
    return;
  }

  private extractData(response: Response) {
    let body = response.json();
    return body.data || {};
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }

}
