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
  public condition = 0
  public fileSelected: File = null;
  public categorys:any =[];
  public selectCategory:any=1;
  constructor(
    private addProductService: addProductService,
    private router: Router
  ) { }

  onSubmit() {
    console.log(this.condition);
    this.addProductService.uploadimage(this.fileSelected)
    .pipe()
    .subscribe(res=>{
      this.imgURL="https://drive.google.com/uc?id="+res.id;
      let date = ""
      const dateCurr = new Date()
      date = dateCurr.getFullYear() + "-"
      if (dateCurr.getMonth() + 1 < 10) {
        date += "0" + (dateCurr.getMonth() + 1) + "-"
      } else {
        date += (dateCurr.getMonth() + 1) + "-"
      }
      if (dateCurr.getDate() < 10) {
        date += "0" + dateCurr.getDate()
      } else {
        date += dateCurr.getDate()
      }
      const newProduct = {
        name: this.productName,
        created_date: date,
        price: this.price,
        description: this.description,
        product_group_id: this.selectCategory,
        userID: 1,
        quantity: this.quantity,
        path: this.imgURL
      }
  
      this.addProductService.handleAddProduct(newProduct).subscribe(
        (data) => {
          console.log(data)
          // redirect to products
          this.router.navigateByUrl('/products');

        }
      )
    });
  }
  getCategory()
  {
    this.addProductService.getCategory()
    .pipe()
    .subscribe(res=>{
      this.categorys=res;
    });
  }
  selectImage(event) {
    this.fileSelected = <File>event.target.files[0];
    //console.log(this.fileSelected);
  /*   var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (rss) => { // called once readAsDataURL is completed
      console.log(rss);
    } */
  }
  ngOnInit() {
    this.getCategory();
  }


}
