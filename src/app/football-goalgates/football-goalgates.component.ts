import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { MatSnackBar } from '@angular/material';
import { Product } from '../product';

@Component({
  selector: 'app-football-goalgates',
  templateUrl: './football-goalgates.component.html',
  styleUrls: ['./football-goalgates.component.scss']
})
export class FootballGoalgatesComponent implements OnInit {

  constructor(private shopService: ShopService, private snackbar: MatSnackBar) { }

  goalgates: Product[];
  sortedGoalgates: Product[];
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.shopService.getFootballGoalgates().subscribe((goalgates) => {
      this.goalgates = goalgates;
      this.sortGoalgates('desc');
      this.isLoading = false;
    }, (error) => {
      console.error('Error!', error);
    });
  }

  sortGoalgates(method: string): void {
    if (method === 'asc') {
      this.sortedGoalgates = this.goalgates.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (method === 'desc') {
      this.sortedGoalgates = this.goalgates.sort((a, b) => {
        return b.price - a.price;
      });
    }
  }

  addToCart(accessorie: Product): void {
    this.shopService.addToCart(accessorie).subscribe((result) => {
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
