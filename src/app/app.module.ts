import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
// import { MainComponent } from './hero-section/main/main.component';
import { TokensComponent } from './hero-section/tokens/tokens.component';
import { NftsComponent } from './hero-section/nfts/nfts.component';
import { TransactionsComponent } from './hero-section/transactions/transactions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// import { NgChartsModule } from 'ng2-charts';
import { ShortenPipe } from './side-nav/shorten.pipe';
import { MatTableModule } from '@angular/material/table';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    // MainComponent,
    TokensComponent,
    NftsComponent,
    TransactionsComponent,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    // NgChartsModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
