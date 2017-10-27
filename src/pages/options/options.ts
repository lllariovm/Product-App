import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {RegisterUserPage} from '../register-user/register-user';
import {LoginPage} from '../login/login';
import {HomePage} from '../home/home';
import {UserServiceProvider} from '../../providers/user-service/user-service';


@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
    users: any;
  
    constructor(public navCtrl: NavController, private viewCtrl: ViewController, userService: UserServiceProvider) {
      userService.getUsers()
      .then(result => {
        console.debug(result);
        this.users = result;
        if(this.users != null)
        {
          console.log(this.users.email + ', ' + this.users.password);
        }
      })
      .catch(err=>console.error("error create product: ", err));
    }
  
    ionViewDidLoad() {
      //console.log('Hello OptionsPage Page');
      
    }
  
    goToRegister()
    {
      this.navCtrl.push(RegisterUserPage);
    }
  
    goToLogin()
    {
      this.navCtrl.push(LoginPage);
    }
  
    ionViewWillEnter() {
          this.viewCtrl.showBackButton(false);
      }
  
  
  
  }
