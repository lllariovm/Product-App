import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { UserServiceDbProvider } from '../user-service-db/user-service-db';
import 'rxjs/add/operator/map';

@Injectable()
export class UserServiceProvider {
  public listUsers: any;

  constructor(public database: UserServiceDbProvider) {
    this.getUsers();
  }

  public addUser(user: User){
    return this.database.addUser(user)
      .then(list => {
        return this.getUsers()
          .then(() => {
            return list;
          })
          .catch(err=>console.error("error create user: ", err));
    });
  }

  public getUsers() {
    return this.database.getUsers()
      .then((data:any) => {
        let listUsers: any = [];
        if (data) {
          for(let item of data) {
            listUsers.push(item);
          }
        }
        this.listUsers = listUsers;
      })
      .catch(err=>console.error("error list of users: ", err));
  }

  public getUser(email: string, password: string) {
    return this.database.getUser(email, password)
      .then((data:any) => {
        return data;
      })
      .catch(err=>console.error("error list of users: ", err));
  }

  public getUserEmail(email: string) {
    return this.database.getUserEmail(email)
      .then((data:any) => {
        return data;
      })
      .catch(err=>console.error("error list of users: ", err));
  }


  public removeUser(id: number) {
    return this.database.deleteUser(id)
      .then(() => {
        return this.getUsers();
      })
      .catch(err=>console.error("error remove product: ", err));
  }

  public forgotPassword(email: string, password: string)
  {
      return this.database.forgotPassword(email, password)
      .then(list => {
        return this.getUser(email,password)
          .then(() => {
            return list;
          })
          .catch(err=>console.error("error update product: ", err));
      });
  }

  public updateUser(user: User){
    return this.database.updateUser(user)
      .then(list => {
        return this.getUsers()
          .then(() => {
            return list;
          })
          .catch(err=>console.error("error update product: ", err));
    });
  }

}
