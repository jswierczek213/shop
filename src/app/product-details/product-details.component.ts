import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ShopService } from '../shop.service';
import { forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private snackbar: MatSnackBar,
    private location: Location
    ) { }

  allProducts: Product[] = [];
  product: Product;
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
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

      this.route.paramMap.subscribe((params) => {
        const targetIndex = this.allProducts.findIndex((x: Product) => x.productId === parseInt(params.get('productId'), 10));
        this.product = this.allProducts[targetIndex];
      }, (error) => {
        console.error('Error!', error);
      });
      this.isLoading = false;
    }, (error) => {
      console.error('Error!', error);
    });
  }

  addToCart(): void {
    this.shopService.addToCart(this.product).subscribe((result) => {
      this.openSnackbar(result, 'Ukryj');
    }, (error) => {
      console.error('Error!', error);
    });
  }

  openSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 1500
    });
  }

  goBack(): void {
    this.location.back();
  }

  isFromVolleyball(): boolean {
    if ((this.product.productId >= 1) && (this.product.productId <= 16)) {
      return true;
    } else {
      return false;
    }
  }

  isFromBasketball(): boolean {
    if ((this.product.productId >= 17) && (this.product.productId <= 33)) {
      return true;
    } else {
      return false;
    }
  }

  isFromFootball(): boolean {
    if ((this.product.productId >= 34) && (this.product.productId <= 51)) {
      return true;
    } else {
      return false;
    }
  }

}
