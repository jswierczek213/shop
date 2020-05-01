import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { VoleyballBallsComponent } from './voleyball-balls/voleyball-balls.component';
import { ShopService } from './shop.service';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { VoleyballNetsComponent } from './voleyball-nets/voleyball-nets.component';
import { VoleyballAccessoriesComponent } from './voleyball-accessories/voleyball-accessories.component';
import { TitleToolbarComponent } from './title-toolbar/title-toolbar.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BasketballBallsComponent } from './basketball-balls/basketball-balls.component';
import { BasketballBasketsComponent } from './basketball-baskets/basketball-baskets.component';
import { BasketballAccessoriesComponent } from './basketball-accessories/basketball-accessories.component';
import { FootballBallsComponent } from './football-balls/football-balls.component';
import { FootballGoalgatesComponent } from './football-goalgates/football-goalgates.component';
import { FootballEquipmentComponent } from './football-equipment/football-equipment.component';
import { FootballAccessoriesComponent } from './football-accessories/football-accessories.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    VoleyballBallsComponent,
    NavBarComponent,
    VoleyballNetsComponent,
    VoleyballAccessoriesComponent,
    TitleToolbarComponent,
    ProductDetailsComponent,
    NotFoundComponent,
    BasketballBallsComponent,
    BasketballBasketsComponent,
    BasketballAccessoriesComponent,
    FootballBallsComponent,
    FootballGoalgatesComponent,
    FootballEquipmentComponent,
    FootballAccessoriesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [ShopService],
  bootstrap: [AppComponent]
})
export class AppModule { }
