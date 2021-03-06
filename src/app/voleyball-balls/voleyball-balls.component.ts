import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from '../product';
import { MatSnackBar } from '@angular/material';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-voleyball-balls',
  templateUrl: './voleyball-balls.component.html',
  styleUrls: ['./voleyball-balls.component.scss']
})
export class VoleyballBallsComponent implements OnInit {

  constructor(private shopService: ShopService, private snackbar: MatSnackBar) { }

  balls: Product[];
  sortedBalls: Product[];
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.shopService.getVolleyballBalls().subscribe(
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
