import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { VoleyballBallsComponent } from './voleyball-balls/voleyball-balls.component';
import { VoleyballNetsComponent } from './voleyball-nets/voleyball-nets.component';
import { VoleyballAccessoriesComponent } from './voleyball-accessories/voleyball-accessories.component';
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


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'my-cart', component: ShoppingCartComponent},
  {path: 'volleyball/balls', component: VoleyballBallsComponent},
  {path: 'volleyball/nets', component: VoleyballNetsComponent},
  {path: 'volleyball/accessories', component: VoleyballAccessoriesComponent},
  {path: 'basketball/balls', component: BasketballBallsComponent},
  {path: 'basketball/baskets', component: BasketballBasketsComponent},
  {path: 'basketball/accessories', component: BasketballAccessoriesComponent},
  {path: 'football/balls', component: FootballBallsComponent},
  {path: 'football/goalgates', component: FootballGoalgatesComponent},
  {path: 'football/equipment', component: FootballEquipmentComponent},
  {path: 'football/accessories', component: FootballAccessoriesComponent},
  {path: 'products/:productId', component: ProductDetailsComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
