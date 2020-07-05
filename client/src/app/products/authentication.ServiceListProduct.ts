import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductList } from './model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { Console } from 'console';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationServiceListProduct {
    private currentProductListSubject: BehaviorSubject<ProductList>;
    public currentProductList: Observable<ProductList>;
    private urlAPI = "http://localhost:8080";
    constructor(private http: HttpClient) {
        
    }

    public get currentProductListValue(): ProductList {
        return this.currentProductListSubject.value;
    }

    public list = () => {
        const listUrl = `${this.urlAPI}/product/getlist`;
        console.log(listUrl);

        return this.http
            .get<any>(listUrl)
            .pipe(
                map((ProductList) => {
                    if (ProductList != null) {
                        let products = []
                        for (let i = 0; i < ProductList.length; i++) {
                            let newProductList = {} as ProductList;
                            newProductList.name = ProductList[i].name;
                            newProductList.price = ProductList[i].price;
                            newProductList.description = ProductList[i].description;
                            newProductList.productimg = ProductList[i].productImages[0].path;
                            newProductList.quantity = ProductList[i].quantity;
                            products.push(newProductList);
                        }
                        return products;
                    } else {
                        return null;
                    }
                })
            );
    }
}