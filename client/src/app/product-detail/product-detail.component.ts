import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceProductItem } from './authentication.ServiceProductItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public productItem = {}
  public productNumber = 0
  public productname = localStorage.getItem('productName')
  
  constructor(
    private authenticationServiceProductItem: AuthenticationServiceProductItem,
    private router: Router
  ) { }

  getProduct = () => {
    this.authenticationServiceProductItem.showProduct(this.productname).subscribe(
      (data) => {
        if (data != null && data.name) {
          this.productItem = data
        } else {
          return window.alert('error')
        }
      },
      (err) => console.error(err))
  }

  handleClickOrderNow = (productName) => {
    let cart = []
      if(this.productItem["name"] === productName) {
        if(JSON.parse(localStorage.getItem("cart")) != null) {
          cart = JSON.parse(localStorage.getItem("cart"))
          let count = 0
          for( let i =0; i < cart.length; i++) {
            if(cart[i]["name"] === this.productItem["name"]) {
              cart[i]["amount"]++
              cart[i]["price"] = cart[i]["unitprice"] * cart[i]["amount"]
              break
            } else {
              count++
            }
          }
          if(count === cart.length) {
            let product = {
              name: this.productItem["name"],
              unitprice: this.productItem["price"],
              price: this.productItem["price"],
              amount: 1
            }
            cart.push(product)
          }
          localStorage.setItem("cart", JSON.stringify(cart))
          this.productNumber++
        } else {
          let product = {
            name: this.productItem["name"],
            unitprice: this.productItem["price"],
            price: this.productItem["price"],
            amount: 1
          }
          cart.push(product)
          localStorage.setItem("cart", JSON.stringify(cart))
        }
      }
  }

  ngOnInit() {
    this.getProduct()
    let productNumber = JSON.parse(localStorage.getItem("cart"))
    for(let i = 0; i < productNumber.length; i++) {
      this.productNumber += productNumber[i]["amount"] 
    }
  }

}
