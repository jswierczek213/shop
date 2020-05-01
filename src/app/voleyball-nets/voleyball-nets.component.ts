import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { MatSnackBar } from '@angular/material';
import { Product } from '../product';

@Component({
  selector: 'app-voleyball-nets',
  templateUrl: './voleyball-nets.component.html',
  styleUrls: ['./voleyball-nets.component.scss']
})
export class VoleyballNetsComponent implements OnInit {

  constructor(private shopService: ShopService, private snackbar: MatSnackBar) { }

  nets: Product[];
  sortedNets: Product[];
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.shopService.getVolleyballNets().subscribe((nets) => {
      this.nets = nets;
      this.sortNets('desc');
      this.isLoading = false;
    }, (error) => {
      console.error('Error!', error);
    });
  }

  sortNets(method: string): void {
    if (method === 'asc') {
      this.sortedNets = this.nets.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (method === 'desc') {
      this.sortedNets = this.nets.sort((a, b) => {
        return b.price - a.price;
      });
    }
  }

  addToCart(net: Product): void {
    this.shopService.addToCart(net).subscribe((result) => {
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
