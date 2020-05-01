import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { MatSnackBar } from '@angular/material';
import { Product } from '../product';

@Component({
  selector: 'app-football-equipment',
  templateUrl: './football-equipment.component.html',
  styleUrls: ['./football-equipment.component.scss']
})
export class FootballEquipmentComponent implements OnInit {

  constructor(private shopService: ShopService, private snackbar: MatSnackBar) { }

  equipment: Product[];
  sortedEquipment: Product[];
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.shopService.getFootballEquipment().subscribe((equipment) => {
      this.equipment = equipment;
      this.sortEquipment('desc');
      this.isLoading = false;
    }, (error) => {
      console.error('Error!', error);
    });
  }

  sortEquipment(method: string): void {
    if (method === 'asc') {
      this.sortedEquipment = this.equipment.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (method === 'desc') {
      this.sortedEquipment = this.equipment.sort((a, b) => {
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
