import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import {ProductDetailPage} from "../product-detail/product-detail";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public productService: ProductServiceProvider) {

  }
  public itemSelected(item: any) {
    this.navCtrl.push(ProductDetailPage, {id: item.id});
  }
}
