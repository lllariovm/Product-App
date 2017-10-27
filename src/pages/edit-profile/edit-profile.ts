import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import { User } from '../../model/user';
import {ProfileDetailPage} from '../profile-detail/profile-detail';
import {CustomValidators} from '../../validators/custom-validators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  email: string;
	user: User = new User();
  userForm: FormGroup;

  constructor(public navCtrl: NavController, public storage: Storage, private userService: UserServiceProvider, public alertCtrl: AlertController, public formBuilder: FormBuilder, private viewCtrl: ViewController) {
    this.userForm = this.createUserForm();
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  ionViewDidLoad() {
    //console.log('Hello EditProfilePage Page');

  }

  ngOnInit()
  {
    this.storage.get("email").then(email => {
        console.log(email); 
        this.userService.getUserEmail(email).then(user=>{this.user=user;
        this.userForm = this.formBuilder.group({
        FirstName: [this.user.firstname, [Validators.required, Validators.minLength(3)]],
        LastName: [this.user.lastname, [Validators.required, Validators.minLength(3)]],
        Phone: [this.user.phone, [Validators.required, Validators.minLength(10),Validators.maxLength(10), CustomValidators.phoneValidator]],
        Email: [this.user.email, [Validators.required, Validators.minLength(6), CustomValidators.emailValidator]]
      });
      }),
                error => {

                console.log(error);
      }
    });
  }


  public createUserForm() {
  return this.formBuilder.group({
    FirstName: ['', [Validators.required, Validators.minLength(3)]],
    LastName: ['', [Validators.required, Validators.minLength(3)]],
    Phone: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10), CustomValidators.phoneValidator]],
    Email: ['', [Validators.required, Validators.minLength(6), CustomValidators.emailValidator]]
  });
  }

  save(): void {
    let prompt = this.alertCtrl.create({
    title: 'Confirmar Actualización',
    message: "Desea actualizar sus datos?",
    buttons: [
      {
        text: 'Cancelar',
        handler: data => {
          
        }
      },
      {
        text: 'Acceptar',
        handler: data => {
                this.user.firstname = this.userForm.value.FirstName;
                this.user.lastname = this.userForm.value.LastName;
                this.user.phone = this.userForm.value.Phone;
                this.user.email = this.userForm.value.Email;
                this.user.password = this.userForm.value.Password;

                this.userService.updateUser(this.user)
                .then(
                    response => {console.log(response);
                      this.navCtrl.push(ProfileDetailPage);
                      
                    },
                    err => { console.log(err)});
               
              }

            }

          ]
        });
      prompt.present();        
  }
}