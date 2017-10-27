import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import { Product } from '../../model/product';
import {HomePage} from '../home/home';
import {CustomValidators} from '../../validators/custom-validators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  product: Product = new Product();
  productForm: FormGroup;
  id: any;

  constructor(public navCtrl: NavController, 
    private productService: ProductServiceProvider, 
    private param: NavParams, 
    public alertCtrl: AlertController, 
    public formBuilder: FormBuilder, 
    public storage: Storage) {
      this.id = this.param.get('id');
      this.productForm = this.createProductForm();
  }

  ionViewDidLoad() {
    //console.log('Hello EditProductPage Page');
   
  } 

  ngOnInit()
  {
    this.storage.get("id").then(id => {
      this.productService.getProduct(this.id).then(product=>{this.product=product;
      this.productForm = this.formBuilder.group({
      name: [this.product.name, [Validators.required, Validators.minLength(4)]],
      type: [this.product.type, [Validators.required, Validators.minLength(6)]],
      price: [this.product.price, [Validators.required, Validators.minLength(5)]],
      quantity: [this.product.quantity, [Validators.required, Validators.minLength(1)]],
      latitude: [this.product.latitude, [Validators.required]],
      longitude: [this.product.longitude, [Validators.required]]
    });
      }),
                error => {

                console.log(error);
      }
    });
  }

   public createProductForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      type: ['', [Validators.required, Validators.minLength(6)]],
      price: ['', [Validators.required, Validators.minLength(5)]],
      quantity: ['', [Validators.required, Validators.minLength(1)]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    });
  }

  save(): void {
      let prompt = this.alertCtrl.create({
      title: 'Confirmar Actualización',
      message: "Desea actualizar este producto?",
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            
          }
        },
        {
          text: 'Acceptar',
          handler: data => {
            this.product.id = this.id;
            this.product.name = this.productForm.value.name;
            this.product.type = this.productForm.value.type;
            this.product.price = this.productForm.value.price;
            this.product.quantity = this.productForm.value.quantity;
            this.product.latitude = this.productForm.value.latitude;
            this.product.longitude = this.productForm.value.longitude;
            this.productService.updateProduct(this.product)
            .then(
                response => {
                  console.log(response);
                  this.navCtrl.setRoot(HomePage, {});
                  
                },
                err => { console.log(err)});
            
          }

        }

      ]
    });
    prompt.present();        

    }
}