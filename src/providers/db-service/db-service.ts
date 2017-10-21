import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Platform} from "ionic-angular";

/*
  Generated class for the DbServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbServiceProvider {

  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'Proyecto.db',
        location: 'default'
      })
      .then((db: SQLiteObject)=>{
        this.database = db;
        this.createTableProducts()
          .then(() => {
            this.dbReady.next(true);
          })
          .catch(err=>console.error("error detected creating tables: ", err));

          this.createTableUsers()
          .then(() => {
            this.dbReady.next(true);
          })
          .catch(err=>console.error("error detected creating tables: ", err));
      })
    });
  }

  private createTableProducts() {
    return this.database.executeSql(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        type TEXT, 
        quantity REAL, 
        price REAL, 
        latitude REAL, 
        longitude REAL 
      );`,{})
      .then(result => {
        console.debug(result);
      })
      .catch(err=>console.error("error detected creating tables: ", err));
  }
  private createTableUsers() {
    return this.database.executeSql(
      `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT, 
        password TEXT, 
        firstName TEXT, 
        lastName TEXT, 
        phone TEXT  
      );`,{})
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

  addUser(email: string,password: string, firstName:string, lastName:string,phone:string){
    return this.isReady()
    .then(() => {
      return this.database.executeSql(`INSERT INTO user(email, password,firstName,lastName,phone) VALUES ('${email}','${password}','${firstName}','${lastName}','${phone}');`, {})
        .then(result => {
          if(result.insertId) return this.getUser(result.insertId);
        })
        .catch(err => console.error(err));
    });
  }

  getUser(id: number){
    return this.isReady()
    .then(() => {
      return this.database.executeSql(`SELECT * FROM user WHERE id = ${id}`, [])
        .then(data => {
          if(data.rows.length) return data.rows.item(0);
          return null;
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
  }

  addProduct(name:string,type:string,quantity:number,price:number,latitude:number,longitude:number){
    return this.isReady()
    .then(() => {
      return this.database.executeSql(`INSERT INTO products(name,type,quantity,price,latitude,longitude) VALUES ('${name}','${type}',${quantity},${price},${latitude},${longitude});`, {})
        .then(result => {
          if(result.insertId) return this.getProduct(result.insertId);
        })
        .catch(err => console.error(err));
    });
  }

  getProduct(id:number){
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

  getProducts() {
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
}
