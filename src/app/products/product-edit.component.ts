import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './product-edit.component.html'
})
export class ProductEditComponent {
    pageTitle: string = 'Product Edit';

    constructor(private _route: ActivatedRoute,
        private _router: Router) { }

    onBack() {
        this._router.navigate(['/products']);
    }
}