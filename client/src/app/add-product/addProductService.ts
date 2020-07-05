import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewProduct } from './model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class addProductService {
    private currentNewProductSubject: BehaviorSubject<NewProduct>;
    public currentNewProduct: Observable<NewProduct>;
    private urlAPI = "http://localhost:8080";
    constructor(private http: HttpClient) {
        
    }

    public get currentNewProductValue(): NewProduct {
        return this.currentNewProductSubject.value;
    }

    public handleAddProduct = (product) => {
        const listUrl = `${this.urlAPI}/product/addproduct`;
        console.log(listUrl);
        console.log(product)
        return this.http
            .post<any>(listUrl, product)
            .pipe(
                map((NewProduct) => {
                    console.log(NewProduct)
                    if (NewProduct != null) {
                        const ok = "ok"
                        return ok;
                    } else {
                        const error = "error"
                        return error;
                    }
                })
            );
    }
}