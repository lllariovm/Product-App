import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import { User } from '../../model/user';
import {EditProfilePage} from '../edit-profile/edit-profile';
import {OptionsPage} from '../options/options';

@IonicPage()
@Component({
  selector: 'page-profile-detail',
  templateUrl: 'profile-detail.html',
})
export class ProfileDetailPage {
  email: string;
	user: User = new User();

  constructor(public navCtrl: NavController, public storage: Storage, 
    private userService: UserServiceProvider, public alertCtrl: AlertController, 
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('Hello ProfileDetailPage Page');
    this.storage.get("email").then(email => {
      console.log('Email: ' + email); 
      this.userService.getUserEmail(email).then(user=>this.user=user),
                error => {
                console.log(error);
  		}
    });
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  edit(){
    this.navCtrl.push(EditProfilePage);
  }

  logout(){
    let prompt = this.alertCtrl.create({
      title: 'Cerrar Sesión',
      message: "Desea cerrar su sesión?",
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            
          }
        },
        {
          text: 'Acceptar',
          handler: data => {
            this.storage.set("email", "");
            this.storage.set("cookie", "");
            this.navCtrl.push(OptionsPage);            
            
          }
        }
      ]
    });
    prompt.present();
  }

  delete(): void {
    let prompt = this.alertCtrl.create({
    title: 'Eliminar Cuenta',
    message: "Desea eliminar su cuenta?",
    buttons: [
      {
        text: 'Cancelar',
        handler: data => {
          
        }
      },
      {
        text: 'Acceptar',
        handler: data => {

            this.userService.removeUser(this.user.id)
            .then(
                response => {console.log(response); 
                  //this.viewCtrl.dismiss();
                  this.storage.set("email", "");
                  this.storage.set("cookie", "");
                  this.navCtrl.push(OptionsPage);  
                                  
                },
                err => { console.log(err)});
            
          }
        }
      ]
    });
    prompt.present();
  }

}