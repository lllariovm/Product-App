import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {DbServiceProvider} from "../db-service/db-service";

/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductServiceProvider {
  public listProducts: any;
  constructor(public database:DbServiceProvider) {
    this.getProducts();
  }

  public getProducts() {
    return this.database.getProducts()
      .then((data:any) => {
        let listProducts: any = [];
        if (data) {
          for(let item of data) {
            listProducts.push(item);
          }
        }
        this.listProducts = listProducts;
      })
      .catch(err=>console.error("error list of products: ", err));
  }
  public getProduct(id:number){
    return this.database.getProduct(id)
    .then((data:any) => {
      return data;
    })
    .catch(err=>console.error("error list of products: ", err));
  }

}
