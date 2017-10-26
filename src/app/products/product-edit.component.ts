import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {
    pageTitle: string = 'Product Edit';

    constructor(private _route: ActivatedRoute,
        private _router: Router) { }

    ngOnInit(): void {
        let id;
        this._route.paramMap.subscribe(
            params => {
                id = params.get('id');
                this.pageTitle += `: ${id}`;
            }
        )
    }

    onBack() {
        this._router.navigate(['/products']);
    }
}