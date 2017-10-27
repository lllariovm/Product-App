import { Component } from '@angular/core';
import { NavController, AlertController, ViewController, NavParams } from 'ionic-angular';
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import { Product } from '../../model/product';
import { EditProductPage } from '../../pages/edit-product/edit-product';


@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  public product: {id: number, name: string, type: string, quantity: number, latitude: number, longitude: number} 
  = {id: 0, name: '', type: '', quantity: 0, latitude: 0, longitude: 0};
  private id: number = null;

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public viewCtrl: ViewController, 
    public navParams: NavParams, 
    private productServiceProvider: ProductServiceProvider) {
    
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

  ionViewDidLoad() {
    //console.log('Hello ProductDetailPage Page');
  }

  delete(): void {
    let prompt = this.alertCtrl.create({
      title: 'Eliminar Producto',
      message: "Desea eliminar este producto?",
      buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              
            }
          },
          {
            text: 'Aceptar',
            handler: data => {

              this.productServiceProvider.removeProduct(this.id)
              .then(result => {
                console.debug(result);
                this.dismiss();
              })
              .catch(err=>console.error("error create product: ", err));
                
            }            
          }
        ]
      }
    );
    prompt.present();    
  }

  edit(){
  	this.navCtrl.push(EditProductPage, {id: this.product.id}); 
  }

  public dismiss() {
    let data = {};
    this.viewCtrl.dismiss(data);
  }
}
