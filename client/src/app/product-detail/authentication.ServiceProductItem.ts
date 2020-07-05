import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductItem } from './model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { Console } from 'console';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationServiceProductItem {
    private currentProductItemSubject: BehaviorSubject<ProductItem>;
    public currentProductItem: Observable<ProductItem>;
    private urlAPI = "http://localhost:8080";
    constructor(private http: HttpClient) {
        
    }

    public get currentProductItemValue(): ProductItem {
        return this.currentProductItemSubject.value;
    }

    public showProduct = (name: String) => {
        const listUrl = `${this.urlAPI}/product/getproductbyname`;
        const params = {
            name: name
        }
        console.log(listUrl);

        return this.http
            .post<any>(listUrl, params)
            .pipe(
                map((ProductItem) => {
                    if (ProductItem != null) {
                        let newProductItem = {} as ProductItem;
                        newProductItem.name = ProductItem.name;
                        newProductItem.price = ProductItem.price;
                        newProductItem.description = ProductItem.description;
                        newProductItem.productimg = ProductItem.productImages[0].path;
                        newProductItem.quantity = ProductItem.quantity;
                        newProductItem.manufaturer = ProductItem.variant
                        newProductItem.category = ProductItem.groupname
                        return newProductItem;
                    } else {
                        return null;
                    }
                })
            );
    }
}