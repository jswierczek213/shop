import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  products: Product[] = [];
  productCount = 0;

  // Volleyball
  getVolleyballBalls(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/server/voleyball/voleyball-balls.json');
  }

  getVolleyballNets(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/server/voleyball/voleyball-nets.json');
  }

  getVolleyballAccessories(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/server/voleyball/voleyball-accessories.json');
  }

  // Basketball
  getBasketballBalls(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/server/basketball/basketball-balls.json');
  }

  getBasketballBaskets(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/server/basketball/basketball-baskets.json');
  }

  getBasketballAccessories(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/server/basketball/basketball-accessories.json');
  }

  // Football
  getFootballBalls(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/server/football/football-balls.json');
  }

  getFootballGoalgates(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/server/football/football-goalgates.json');
  }

  getFootballEquipment(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/server/football/football-equipment.json');
  }

  getFootballAccessories(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/server/football/football-accessories.json');
  }

  addToCart(product: Product): Observable<string> {
    if (!this.products.some((item: Product) => item.name === product.name)) {
      this.products.push(product);
      this.productCount = this.products.length;
      return of('Dodano do koszyka!');
    } else {
      return of('Produkt został dodany wcześniej!');
    }
  }

  getCartProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductCount(): Observable<number> {
    return of(this.productCount);
  }

  removeProduct(product: Product): Observable<string> {
    this.products = this.products.filter(elem => {
      return elem.name !== product.name;
    });
    this.productCount = this.products.length;
    return of('Usunięto!');
  }
}
