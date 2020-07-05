import { Component, OnInit } from '@angular/core';
import { Local } from 'protractor/built/driverProviders';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public cart = JSON.parse(localStorage.getItem("cart"))
  public totalPrice = 0
  constructor(
    private router: Router
  ) { }

  handleRemoveProduct = (productName) => {
    this.cart.forEach(element => {
      if(element["name"] === productName) {
        this.cart.splice(this.cart.indexOf(element), 1);
        localStorage.setItem("cart", JSON.stringify(this.cart))
        this.totalPrice = 0
        for(let i = 0; i < this.cart.length; i++) {
          this.totalPrice += this.cart[i]["price"]
        }
      }
    });
  }

  handleCleanCart = () => {
    this.cart = []
    localStorage.setItem("cart", JSON.stringify(this.cart))
    this.totalPrice = 0
  }

  handleCheckoutCart = () => {
    alert("checkout successfull !!!")
    this.cart = []
    localStorage.setItem("cart", JSON.stringify(this.cart))
    this.totalPrice = 0
    this.router.navigateByUrl('/products');
  }

  ngOnInit() {
    for(let i = 0; i < this.cart.length; i++) {
      this.totalPrice += this.cart[i]["price"]
    }
  }

}
