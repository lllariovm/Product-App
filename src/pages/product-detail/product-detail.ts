import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Dialogs } from '@ionic-native/dialogs';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  public product: {name: string, id: number; type:string, quantity:number, price:number, latitude:number,longitude:number} = 
  {name: '.', id: 0,type:'.',quantity:0,price:0,latitude:0,longitude:0};


  private id: number = null;
  myForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private productServiceProvider :ProductServiceProvider, public dialogs: Dialogs) {

      this.myForm = this.createForm();

      this.id = parseInt(navParams.get('id'));
      if (this.id) {
        this.productServiceProvider.getProduct(this.id)
          .then(result => {
            console.debug(result);
            this.product = result;
            
          })
          .catch(err=>console.error("error create product: ", err));

          
      }  
  }


  private createForm() {
   
    return this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
      id: ['', Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(40)])],
      quantity: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(40)])],
      price: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(40)])],
      latitude: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(40)])], 
      longitude: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(40)])]
    });

  }


   public loadConfirmAlert() {
    this.dialogs.confirm('Desea guardar cambios', 'guardar?', ['Aceptar', 'Cancelar'])
      .then((option: number) => this.updateForm(option))
      .catch(e => console.log('Error displaying dialog', e));

      
    }

  public updateForm(indice:number) {
    if(indice==1){
      this.productServiceProvider.modifyProduct(this.myForm.value.id,
        this.myForm.value.name,
        this.myForm.value.type,
        this.myForm.value.quantity,
        this.myForm.value.price, 
        this.myForm.value.latitude,
        this.myForm.value.longitude).then(result => {
          console.debug(result);
          this.navCtrl.pop();
        })      
        .catch(err=>console.error("error create product: ", err));
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

}
