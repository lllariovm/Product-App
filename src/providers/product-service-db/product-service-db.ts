import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Product} from '../../model/product';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Platform} from "ionic-angular";


@Injectable()
export class ProductServiceDbProvider {

  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);
  private test: Product;

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.test = new Product();
  	this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'proyectofinal.db',
        location: 'default'
      })
      .then((db: SQLiteObject)=>{
        this.database = db;
        this.createTable()
          .then(() => {
            this.dbReady.next(true);
          })
          .catch(err=>console.error("error detected creating tables: ", err));
      })    
    });
  }

  createTable(){
    return this.database.executeSql(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        type TEXT, 
        quantity INTEGER, 
        price INTEGER, 
        latitude INTEGER, 
        longitude INTEGER)`,{})
      .then(result => {
        console.debug(result);
      })
      .catch(err=>console.error("error detected creating tables: ", err));
  }

  private isReady() {
    return new Promise((resolve, reject) => {
      if(this.dbReady.getValue()) {
        resolve();
      } else {
        this.dbReady.subscribe(ready => {
          if(ready) resolve();
        });
      }
    })
  }

  getProducts(){
    return this.isReady()
    .then(() => {
      return this.database.executeSql("SELECT * FROM products", [])
        .then(data => {
          let products = [];
          for(let i=0; i<data.rows.length; i++){
            products.push(data.rows.item(i));
          }
          return products;
        })
        .catch(err => console.error(err));
    })
    .catch(err=>console.error("not ready: ", err));
  }

  getProduct(id: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM products WHERE id = ${id}`, [])
          .then(data => {
            if(data.rows.length) return data.rows.item(0);
            return null;
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  addProduct(product: Product){
    console.log('Consulta: ' + `INSERT INTO products(name, type, quantity, price, latitude, longitude) VALUES 
    ('${product.name}', '${product.type}', ${product.quantity}, ${product.price}, ${product.latitude}, 
    ${product.longitude});`);

    return this.isReady()
    .then(() => {
      return this.database.executeSql(`INSERT INTO products(name, type, quantity, price, latitude, longitude) VALUES 
      ('${product.name}', '${product.type}', ${product.quantity}, ${product.price}, ${product.latitude}, 
      ${product.longitude});`, {})

      /*return this.database.executeSql(`INSERT INTO products(name, type, quantity, price, latitude, longitude) VALUES 
      ('Apple', 'iPhone', 10, 2500000, 1.98473, -7.394985);`, {})*/

        .then(result => {
          if(result.insertId) return this.getProduct(result.insertId);
        })
        .catch(err => console.error(err));
    });
  }

  deleteProduct(id: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`DELETE FROM products WHERE id = ${id}`, [])
      })
      .catch(err => console.error(err));
  }

  updateProduct(product: Product){
    console.log('Desde Name: ' + product.name);
    console.log('Desde Type: ' + product.type);
    console.log('Desde Id: ' + product.id);

    let query = `UPDATE products SET name = '${product.name}', type = '${product.type}', 
    quantity = ${product.quantity}, price = ${product.price}, latitude = ${product.latitude}, 
    longitude = ${product.longitude} WHERE id = ${product.id}`;

    console.log('SQL: ' + query);
    return this.database.executeSql(query, []);
  }

  getUser(id:number){
  /*	console.log('nombre en el query antes: ' + id );
    let query = 'SELECT * FROM user where id = ?;';

    return this.db.executeSql(query, [id]).then(user => {
    	console.log('nombre en el query: ' + user );
    	return Promise.resolve(user.rows.item(0));
    	})*/
  }
}