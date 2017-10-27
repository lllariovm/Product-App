import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import { User } from '../../model/user';
import {ForgotPasswordPage} from '../forgot-password/forgot-password';
import {HomePage} from '../home/home';
import { Storage } from '@ionic/storage';
import {CustomValidators} from '../../validators/custom-validators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ProfileDetailPage } from '../profile-detail/profile-detail';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user:User;
  loginForm: FormGroup;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, 
    private userService: UserServiceProvider, public storage: Storage, public formBuilder: FormBuilder) 
  {
    this.user = new User();
    this.loginForm = this.createLoginForm();
  } 
  
  ionViewDidLoad() {
    //console.log('Hello LoginPage Page');
  }

   public createLoginForm() {
    return this.formBuilder.group({
      Email: ['', [Validators.required, Validators.minLength(6), CustomValidators.emailValidator]],
      Password: ['', [Validators.required, Validators.minLength(6), CustomValidators.passwordValidator]]
    });
  }

  goToForgotPassword()
  {
    this.navCtrl.push(ForgotPasswordPage, {email: this.loginForm.value.Email});
  }

  loginUser()
  {
    this.user.email = this.loginForm.value.Email;
    this.user.password = this.loginForm.value.Password;

      this.userService.getUser(this.user.email, this.user.password).then(user=>{
        
        if(user == null){          
          let alert = this.alertCtrl.create({
          title: 'usuario Invalido',
          subTitle: 'Verifique su información',
          buttons: ['Aceptar']
          });
          alert.present(); 
          
        }else{             
          this.storage.set("email", user.email);
          this.storage.set("cookie", user.cookie);
          this.navCtrl.setRoot(HomePage);         
        }      

      }),
          error => {
            console.log(error);
          }
    
  }

}