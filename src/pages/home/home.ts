import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

import { Product } from '../../model/product';
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import { ProductDetailPage } from '../../pages/product-detail/product-detail';
import { CreateProductPage } from '../../pages/create-product/create-product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selected: Product;
  products: Product[];

  constructor(public navCtrl: NavController, 
    private productService: ProductServiceProvider) {
  
  }

  public itemSelected(item: any) {
    this.navCtrl.push(ProductDetailPage, {id: item.id});
  }

  public addProduct() {
    this.navCtrl.push(CreateProductPage, {});
  }
}