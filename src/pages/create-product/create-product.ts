import { Component } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import { Product } from '../../model/product';
import { Geolocation } from '@ionic-native/geolocation';
import {CustomValidators} from '../../validators/custom-validators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
})
export class CreateProductPage {
  product: Product = new Product();
  productForm: FormGroup;

  constructor(public viewCtrl: ViewController, private geolocation: Geolocation, 
    public navCtrl: NavController, public alertCtrl: AlertController, 
    public formBuilder: FormBuilder, private productService: ProductServiceProvider) {
    this.productForm = this.createProductForm();
  }

  ionViewDidLoad() {
    //console.log('Hello CreateProductPage Page');
  }

  public createProductForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      type: ['', [Validators.required, Validators.minLength(6)]],
      price: ['', [Validators.required, Validators.minLength(5), CustomValidators.priceValidator]],
      quantity: ['', [Validators.required, Validators.minLength(1), CustomValidators.quantityValidator]]
    });
  }

  add(): void {
    let prompt = this.alertCtrl.create({
      title: 'Agregar Producto',
      message: "Desea agregar este producto?",
      buttons: [
          {
            text: 'Cancelar',
            handler: data => {
              
            }
          },
          {
            text: 'Aceptar',
            handler: data => {

              this.product.name = this.productForm.value.name;
              this.product.type = this.productForm.value.type;
              this.product.price = this.productForm.value.price;
              this.product.quantity = this.productForm.value.quantity;

              /* this.geolocation.getCurrentPosition().then(resp => {
                this.product.latitude = resp.coords.latitude;
                this.product.longitude = resp.coords.longitude;
              }) */

              this.product.latitude = 1.12345;
              this.product.longitude = 2.1234;

              console.log('Latitude= ' + this.product.latitude);
              console.log('longitude= ' + this.product.longitude);
              
              console.log(this.product);

              this.productService.addProduct(this.product)
              .then(result => {
                console.debug(result);
                this.dismiss();
                this.navCtrl.setRoot(HomePage, {});
              })
              .catch(err=>console.error("error create product: ", err));

            }
          }
        ]
      }
    );
    prompt.present();      
  }

  public dismiss() {
    let data = {};
    this.viewCtrl.dismiss(data);
  }
}