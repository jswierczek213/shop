import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { MatSnackBar } from '@angular/material';
import { Product } from '../product';

@Component({
  selector: 'app-basketball-baskets',
  templateUrl: './basketball-baskets.component.html',
  styleUrls: ['./basketball-baskets.component.scss']
})
export class BasketballBasketsComponent implements OnInit {

  constructor(private shopService: ShopService, private snackbar: MatSnackBar) { }

  baskets: Product[];
  sortedBaskets: Product[];
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.shopService.getBasketballBaskets().subscribe(
      (basket) => {
        this.baskets = basket;
        this.isLoading = false;
      },
      (error) => console.error('Error!', error),
      () => this.sortBaskets('desc')
    );
  }

  sortBaskets(method: string): void {
    if (method === 'asc') {
      this.sortedBaskets = this.baskets.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (method === 'desc') {
      this.sortedBaskets = this.baskets.sort((a, b) => {
        return b.price - a.price;
      });
    }
  }

  addToCart(basket: Product): void {
    this.shopService.addToCart(basket).subscribe((result) => {
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

}
