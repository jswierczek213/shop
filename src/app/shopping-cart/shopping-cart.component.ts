import { Component, OnInit, DoCheck } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from '../product';
import { MatSnackBar } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, DoCheck {

  constructor(
    private shopService: ShopService,
    private snackbar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
    ) { }

  selectedCategories = [];
  products: Array<any> = [];
  productCount: number;
  totalPrice: number;
  isSmallScreen: boolean;

  ngOnInit() {
    this.getProducts();
    this.shopService.getProductCount().subscribe((count) => {
      this.productCount = count;
    }, (error) => {
      console.error('Error!', error);
    });
    this.summary();
  }

  ngDoCheck() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 720px)');
  }

  getProducts(): void {
    this.shopService.getCartProducts().subscribe((cartProducts) => {
      this.products = cartProducts;
      this.productCount = this.products.length;

      this.selectedCategories = this.products.map(item => item.category);
      this.selectedCategories = this.selectedCategories.filter((v, i, a) => a.indexOf(v) === i);
    }, (error) => {
      console.error('Error!', error);
    });
  }

  remove(item: Product): void {
    this.shopService.removeProduct(item).subscribe((result) => {
      this.openSnackbar(result, 'Ukryj');
      this.getProducts();
      this.summary();
    }, (error) => {
      console.error('Error!', error);
    });
  }

  openSnackbar(message: string, action: string): void {
    this.snackbar.open(message, action, {
      duration: 1500
    });
  }

  summary(): void {
    this.totalPrice = 0;
    this.products.forEach(product => {
      this.totalPrice += product.price;
    });
    this.totalPrice = Math.floor(this.totalPrice * 100) / 100;
  }

}
