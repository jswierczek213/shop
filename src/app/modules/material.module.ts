import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatBadgeModule,
  MatDividerModule,
  MatGridListModule,
  MatListModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatSidenavModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatBadgeModule,
  MatDividerModule,
  MatGridListModule,
  MatListModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatSidenavModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
