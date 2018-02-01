import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail'
  product: IProduct;
  errorMessage: string;
  id: number;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService) { }

  ngOnInit() {
    let param = +this._route.snapshot.paramMap.get('id')
    if (param) {
      this.id = param;
      this.getProduct(this.id)
    }
  }

  getProduct(id: number): void {
    this._productService.getProduct(id).subscribe(product => this.product = product, error => this.errorMessage = error)
  }

  onBack(): void {
    this._router.navigate(['/products'])
  }

  onRatingClicked(message: string) {
    this.pageTitle = 'Product List: ' + message;
  }
}