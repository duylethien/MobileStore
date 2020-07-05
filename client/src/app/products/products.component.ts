import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationServiceListProduct } from './authentication.ServiceListProduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public productNames = []
  public stringProductName = ''
  public productNumber = 0
  public products = [
    {
      productname: 'Iphone X',
      description: 'A smartphone is a handheld personal computer with a mobile operating system ' +
        'and an integrated mobile broadband cellular network connection for voice, SMS,' +
        'and Internetdata communication; most, if not all, smartphones also support Wi-Fi',
      price: '1099',
      quantity: '800',
      productimg: '../../assets/images/iPhone-11-2.jpg'
    },
    {
      productname: 'Iphone X',
      description: 'A smartphone is a handheld personal computer with a mobile operating system ' +
        'and an integrated mobile broadband cellular network connection for voice, SMS,' +
        'and Internetdata communication; most, if not all, smartphones also support Wi-Fi',
      price: '2001',
      quantity: '800',
      productimg: '../../assets/images/iPhone-11-2.jpg'
    },
    {
      productname: 'Iphone X',
      description: 'A smartphone is a handheld personal computer with a mobile operating system ' +
        'and an integrated mobile broadband cellular network connection for voice, SMS,' +
        'and Internetdata communication; most, if not all, smartphones also support Wi-Fi',
      price: '2002',
      quantity: '800',
      productimg: '../../assets/images/iPhone-11-2.jpg'
    }
  ]

  constructor(
    private AuthenticationServiceListProduct: AuthenticationServiceListProduct,
    private router: Router
  ) {

  }

  list = () => {
    
    this.AuthenticationServiceListProduct.list().subscribe(
      (data) => {
        if (data != null && data.length != 0) {
          this.products = data
        } else {
          console.log('list fail');
        }
      },
      (err) => console.error(err)
    );
  };

  handleClickDetailProduct = (productName) => {
    localStorage.setItem("productName", productName)
    this.router.navigateByUrl('/product-detail');
  }

  handleClickOrderNow = (productName) => {
    let cart = []
    // localStorage.setItem("cart", JSON.stringify(cart))
    this.products.forEach(element => {
      if(element["name"] === productName) {
        if(JSON.parse(localStorage.getItem("cart")) != null) {
          cart = JSON.parse(localStorage.getItem("cart"))
          let count = 0
          for( let i =0; i < cart.length; i++) {
            if(cart[i]["name"] === element["name"]) {
              cart[i]["amount"]++
              cart[i]["price"] = cart[i]["unitprice"] * cart[i]["amount"]
              break
            } else {
              count++
            }
          }
          if(count === cart.length) {
            let product = {
              name: element["name"],
              unitprice: element["price"],
              price: element["price"],
              amount: 1
            }
            cart.push(product)
          }
          localStorage.setItem("cart", JSON.stringify(cart))
          this.productNumber++
        } else {
          let product = {
            name: element["name"],
            unitprice: element["price"],
            price: element["price"],
            amount: 1
          }
          cart.push(product)
          localStorage.setItem("cart", JSON.stringify(cart))
        }
      }
    });
  }

  ngOnInit() {
    this.list()
    let productNumber = JSON.parse(localStorage.getItem("cart"))
    for(let i = 0; i < productNumber.length; i++) {
      this.productNumber += productNumber[i]["amount"] 
    }
  }

}
