import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
// import observable operators:
import 'rxjs/add/operator/catch'; // catch - for error handling
import 'rxjs/add/operator/do'; // do - for debugging 
import 'rxjs/add/operator/throw'; // throw - also for error handling
import 'rxjs/add/operator/map'; // map - to map the HTTP response to products

import { IProduct } from "./product";

@Injectable()
export class ProductService {
  private _productUrl = './api/products/products.json';

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(this._productUrl)
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getProduct(id: number): Observable<IProduct> {
    return;
  }

  deleteProduct(id: number): Observable<Response> {
    return;
  }

  save(product: IProduct): Observable<IProduct> {
    return;
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }

  }
