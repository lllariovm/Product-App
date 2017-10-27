import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Product } from '../../model/product';
import { ProductServiceDbProvider } from '../product-service-db/product-service-db';

@Injectable()
export class ProductServiceProvider {

  public listProducts: any;

  constructor(public database: ProductServiceDbProvider) { 
    this.getProducts();
  }

  public addProduct(product: Product){
    return this.database.addProduct(product)
      .then(list => {
        return this.getProducts()
          .then(() => {
            return list;
          })
          .catch(err=>console.error("error create product: ", err));
    });
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

  public getProduct(id: number) {
    return this.database.getProduct(id)
      .then((data:any) => {
        return data;
      })
      .catch(err=>console.error("error list of products: ", err));
  }


  public removeProduct(id: number) {
    return this.database.deleteProduct(id)
      .then(() => {
        return this.getProducts();
      })
      .catch(err=>console.error("error remove product: ", err));
  }

  public updateProduct(product: Product){
    return this.database.updateProduct(product)
      .then(list => {
        return this.getProducts()
          .then(() => {
            return list;
          })
          .catch(err=>console.error("error update product: ", err));
    });
  }

}