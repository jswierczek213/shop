import { Component, DoCheck, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ShopService } from '../shop.service';
import { MatSnackBar } from '@angular/material';
import { Product } from '../product';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements DoCheck, OnInit {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private shopService: ShopService,
    private snackbar: MatSnackBar) { }
  isSmallScreen: boolean;
  allProducts: Product[] = [];
  volleyballProducts: Product[] = [];
  basketballProducts: Product[] = [];
  footballProducts: Product[] = [];

  ngOnInit() {
    forkJoin([
      this.shopService.getVolleyballBalls(),
      this.shopService.getVolleyballNets(),
      this.shopService.getVolleyballAccessories(),
      this.shopService.getBasketballBalls(),
      this.shopService.getBasketballBaskets(),
      this.shopService.getBasketballAccessories(),
      this.shopService.getFootballBalls(),
      this.shopService.getFootballGoalgates(),
      this.shopService.getFootballEquipment(),
      this.shopService.getFootballAccessories()
    ]).subscribe(([
      vBalls,
      vNets,
      vAccessories,
      bBalls,
      bBaskets,
      bAccessories,
      fBalls,
      fGoalgates,
      fEquipment,
      fAccessories
    ]) => {
      this.allProducts = [
        ...vBalls,
        ...vNets,
        ...vAccessories,
        ...bBalls,
        ...bBaskets,
        ...bAccessories,
        ...fBalls,
        ...fGoalgates,
        ...fEquipment,
        ...fAccessories
      ];
    },
    (error) => {
      console.error(error);
    }, () => {
      this.generateRandomProducts();
    });
  }

  ngDoCheck() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 720px)');
  }

  addToCart(item: Product) {
    this.shopService.addToCart(item).subscribe((result) => {
      this.openSnackbar(result, 'Ukryj');
    }, (error) => {
      console.error('Error!', error);
    });
  }

  openSnackbar(message: string, action: string): void {
    this.snackbar.open(message, action, {
      duration: 1500
    });
  }

  generateRandomProducts() {
    const randomVolleyballIds = [];
    const randomBasketballIds = [];
    const randomFootballIds = [];

    // Random Ids
    for (let i = 0; i < 3; i++) {
      let randomId = Math.floor(Math.random() * (16 - 1 + 1) + 1);
      while (randomVolleyballIds.includes(randomId)) {
        randomId = Math.floor(Math.random() * (16 - 1 + 1) + 1);
      }
      randomVolleyballIds.push(randomId);
    }

    for (let i = 0; i < 3; i++) {
      let randomId = Math.floor(Math.random() * (33 - 17 + 1) + 17);
      while (randomBasketballIds.includes(randomId)) {
        randomId = Math.floor(Math.random() * (33 - 17 + 1) + 17);
      }
      randomBasketballIds.push(randomId);
    }

    for (let i = 0; i < 3; i++) {
      let randomId = Math.floor(Math.random() * (51 - 34 + 1) + 34);
      while (randomFootballIds.includes(randomId)) {
        randomId = Math.floor(Math.random() * (51 - 34 + 1) + 34);
      }
      randomFootballIds.push(randomId);
    }

    // Random products
    randomVolleyballIds.forEach((id) => {
      this.volleyballProducts.push(this.allProducts.filter((product) => product.productId === id)[0]);
    });

    randomBasketballIds.forEach((id) => {
      this.basketballProducts.push(this.allProducts.filter((product) => product.productId === id)[0]);
    });

    randomFootballIds.forEach((id) => {
      this.footballProducts.push(this.allProducts.filter((product) => product.productId === id)[0]);
    });
  }

}
