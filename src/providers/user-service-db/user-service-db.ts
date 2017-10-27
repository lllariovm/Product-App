import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {User} from '../../model/user';
import {Platform} from "ionic-angular";

@Injectable()
export class UserServiceDbProvider {

  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);
  private test: User;

  constructor(private platform: Platform, private sqlite: SQLite) {
  	this.test = new User();
  	this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'proyectofinal.db',
        location: 'default'
      })
      .then((database: SQLiteObject)=>{
        this.database = database;
        this.createTable()
          .then(() => {
            this.dbReady.next(true);
          })
          .catch(err=>console.error("error detected creating tables: ", err));
      })    
    });
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

  createTable(){
    let sql = `CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      password TEXT, 
      firstname TEXT, 
      lastname TEXT, 
      phone TEXT)`;
    return this.database.executeSql(sql, []);
  }

  getUsers(){
    return this.isReady()
    .then(() => {
      return this.database.executeSql("SELECT * FROM user", [])
        .then(data => {
          let users = [];
          for(let i=0; i<data.rows.length; i++){
            users.push(data.rows.item(i));
          }
          return users;
        })
        .catch(err => console.error(err));
    })
    .catch(err=>console.error("not ready: ", err));
  }

  getUser(email: string, password: string) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM user WHERE email = '${email}' and password = '${password}'`, [])
          .then(data => {
            if(data.rows.length) return data.rows.item(0);
            return null;
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  getUserEmail(email: string) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM user WHERE email = '${email}'`, [])
          .then(data => {
            if(data.rows.length) return data.rows.item(0);
            return null;
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  addUser(user: User){
    console.log('Consulta: ' + `INSERT INTO user(email, password, firstname, lastname, phone) VALUES 
    ('${user.email}', '${user.password}', '${user.firstname}', '${user.lastname}', '${user.phone}');`);

    return this.isReady()
    .then(() => {
      return this.database.executeSql(`INSERT INTO user(email, password, firstname, lastname, phone) VALUES 
      ('${user.email}', '${user.password}', '${user.firstname}', '${user.lastname}', '${user.phone}');`, {})

        .then(result => {
          if(result.insertId) return this.getUser(result.email, result.password);
        })
        .catch(err => console.error(err));
    });
  }

  deleteUser(id: number) {
    console.log('DB id: ' + id);
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`DELETE FROM user WHERE id = ${id}`, [])
      })
      .catch(err => console.error(err));
  }

  forgotPassword(email: string, password: string){
    let query = `UPDATE user SET password = '${password}' WHERE email = '${email}'`;

    console.log('SQL: ' + query);
    return this.database.executeSql(query, []);

  }

  updateUser(user: User){
    let query = `UPDATE user SET firstname = '${user.firstname}', lastname = '${user.lastname}', 
    phone = '${user.phone}', email = '${user.email}' WHERE id = ${user.id}`;

    console.log('SQL: ' + query);
    return this.database.executeSql(query, []);
    
  }

}
