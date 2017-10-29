import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
// import observable operators:
import 'rxjs/add/operator/catch'; // catch - for error handling
import 'rxjs/add/operator/do'; // do - for debugging
import 'rxjs/add/observable/throw'; // throw - also for error handling
import 'rxjs/add/operator/map'; // map - to map the HTTP response to products
import 'rxjs/add/observable/of';

import { IProduct } from "./product";

@Injectable()
export class ProductService {
  private baseUrl = 'api/products';
  // private _productUrl = './api/products_/products.json';

  constructor(private _http: HttpClient,
    private http: Http) { }

  // getProducts(): Observable<IProduct[]> {
  //   console.log('getProducts()');
  //   return this._http.get<IProduct[]>(this._productUrl)
  //     .do(data => console.log('All: ' + JSON.stringify(data)))
  //     .catch(this.handleError);
  // }

  getProducts(): Observable<IProduct[]> {
    return this.http.get(this.baseUrl)
        .map(this.extractData)
        // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleError);
}

getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
    return Observable.of(this.initializeProduct());
    // return Observable.create((observer: any) => {
    //     observer.next(this.initializeProduct());
    //     observer.complete();
    // });
    };
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
        .map(this.extractData)
        .do(data => console.log('getProduct: ' + JSON.stringify(data)))
        .catch(this.handleError);
}

deleteProduct(id: number): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, options)
        .do(data => console.log('deleteProduct: ' + JSON.stringify(data)))
        .catch(this.handleError);
}

saveProduct(product: IProduct): Observable<IProduct> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (product.id === 0) {
        return this.createProduct(product, options);
    }
    return this.updateProduct(product, options);
}

private createProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
    product.id = undefined;
    return this.http.post(this.baseUrl, product, options)
        .map(this.extractData)
        .do(data => console.log('createProduct: ' + JSON.stringify(data)))
        .catch(this.handleError);
}

private updateProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put(url, product, options)
        .map(() => product)
        .do(data => console.log('updateProduct: ' + JSON.stringify(data)))
        .catch(this.handleError);
}

private extractData(response: Response) {
    console.log(response.json());
    let body = response.json();
    return body || {};
}

private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
}

initializeProduct(): IProduct {
    // Return an initialized object
    return {
        id: 0,
        productName: null,
        productCode: null,
        tags: [''],
        releaseDate: null,
        price: null,
        description: null,
        starRating: null,
        imageUrl: null
    };
}
}
