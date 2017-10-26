import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanDeactivate } from '@angular/router';

// import { ProductEditComponent } from './product-edit.component';

@Injectable()
export class ProductDetailGuard implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let id = +route.url[1].path;
    if (isNaN(id) || id < 0) {
      alert('Invalid product Id');
      // start a new navigation to redirect to list page
      this._router.navigate(['/products']);
      // abort current navigation
      return false;
    }
    return true;
  }

}

/* @Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
  canDeactivate(component: ProductEditComponent): boolean {
    if (component.productForm.dirty) {
      let productName = component.productForm.get('productName').value || 'New Product';
      return confirm(`Navigate away and lose all changes to ${productName}?`);
    }
    return true;
  }

} */
