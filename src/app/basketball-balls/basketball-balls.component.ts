import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { MatSnackBar } from '@angular/material';
import { Product } from '../product';

@Component({
  selector: 'app-basketball-balls',
  templateUrl: './basketball-balls.component.html',
  styleUrls: ['./basketball-balls.component.scss']
})
export class BasketballBallsComponent implements OnInit {

  constructor(private shopService: ShopService, private snackbar: MatSnackBar) { }

  balls: Product[];
  sortedBalls: Product[];
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.shopService.getBasketballBalls().subscribe(
      (balls) => {
        this.balls = balls;
        this.isLoading = false;
      },
      (error) => console.error('Error!', error),
      () => this.sortBalls('desc')
    );
  }

  sortBalls(method: string): void {
    if (method === 'asc') {
      this.sortedBalls = this.balls.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (method === 'desc') {
      this.sortedBalls = this.balls.sort((a, b) => {
        return b.price - a.price;
      });
    }
  }

  addToCart(ball: Product): void {
    this.shopService.addToCart(ball).subscribe((result) => {
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
