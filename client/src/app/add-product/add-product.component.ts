import { Component, OnInit } from '@angular/core';
import { addProductService } from './addProductService';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {
  public productName = ""
  public price = 0
  public quantity = 0
  public description = ""
  public manufacturer = ""
  public category = ""
  public imgURL = "../../assets//images/note10Plus.jpg"
  public condition = ""

  constructor(
    private addProductService: addProductService,
    private router: Router
  ) { }

  onSubmit() {
    let date = ""
    const dateCurr = new Date()
    date = dateCurr.getFullYear() + "-"
    if(dateCurr.getMonth() + 1 < 10) {
      date += "0" + (dateCurr.getMonth() + 1) + "-"
    } else {
      date += (dateCurr.getMonth() + 1) + "-"
    } 
    if(dateCurr.getDate() < 10) {
      date += "0" + dateCurr.getDate()
    } else {
      date += dateCurr.getDate()
    }
    const newProduct =  {
      name: this.productName,
      created_date: date,
      price: this.price,
      description: this.description,
      product_group_id: 2,
      userID: 1,
      quantity: this.quantity,
      path: this.imgURL
    }

    this.addProductService.handleAddProduct(newProduct).subscribe(
      (data) => {
        console.log(data)
      }
    )
  }

  ngOnInit() {
  }

}
