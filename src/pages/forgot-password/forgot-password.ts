import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import { User } from '../../model/user';
import {OptionsPage} from '../options/options';
import {CustomValidators} from '../../validators/custom-validators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  user: User = new User();
  fPassForm: FormGroup;

  constructor(public navCtrl: NavController, private param: NavParams, 
    private userService: UserServiceProvider, public alertCtrl: AlertController, 
    public formBuilder: FormBuilder) {
      let email = this.param.get('email');
      this.user.email = email;  
      this.fPassForm = this.forgotPasswordForm();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ForgotPasswordPage');
  }

  public forgotPasswordForm() {
    return this.formBuilder.group({
      Email: [this.user.email, [Validators.required, Validators.minLength(6), CustomValidators.emailValidator]],
      Password: ['', [Validators.required, Validators.minLength(6), CustomValidators.passwordValidator]]
    });
  }

  changePassword(): void {
    let prompt = this.alertCtrl.create({
    title: 'Confirmar Cambio de Contraseña',
    message: "Quiere cambiar su contraseña?",
    buttons: [
      {
        text: 'Cancelar',
        handler: data => {
          
        }
      },
      {
        text: 'Aceptar',
        handler: data => {
          this.user.email = this.fPassForm.value.Email;
          this.user.password = this.fPassForm.value.Password; 

          this.userService.forgotPassword(this.user.email, this.user.password).then(user=>{
            this.user=user;
            console.log(user);
            this.navCtrl.push(OptionsPage);

          }),
              error => {
              console.log(error);
          } 
          
        }
      }
    ]
  });
  prompt.present(); 
  }

}
