import { Component, DoCheck, Input } from '@angular/core';
import { ShopService } from '../shop.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements DoCheck {

  constructor(private shopService: ShopService, private breakpointObserver: BreakpointObserver) { }
  @Input() sidenav: MatSidenav;
  productCount: number;
  isSmallScreen: boolean;

  ngDoCheck() {
    this.shopService.getProductCount().subscribe((count) => {
      this.productCount = count;
    }, (error) => {
      console.error('Error!', error);
    });

    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 720px)');
  }

  toggleSidemenu() {
    this.sidenav.toggle();
  }

}
