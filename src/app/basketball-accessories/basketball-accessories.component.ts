import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { MatSnackBar } from '@angular/material';
import { Product } from '../product';

@Component({
  selector: 'app-basketball-accessories',
  templateUrl: './basketball-accessories.component.html',
  styleUrls: ['./basketball-accessories.component.scss']
})
export class BasketballAccessoriesComponent implements OnInit {

  constructor(private shopService: ShopService, private snackbar: MatSnackBar) { }

  accessories: Product[];
  sortedAccessories: Product[];
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.shopService.getBasketballAccessories().subscribe((accessories) => {
      this.accessories = accessories;
      this.sortAccessories('desc');
      this.isLoading = false;
    }, (error) => {
      console.error('Error!', error);
    });
  }

  sortAccessories(method: string): void {
    if (method === 'asc') {
      this.sortedAccessories = this.accessories.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (method === 'desc') {
      this.sortedAccessories = this.accessories.sort((a, b) => {
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
