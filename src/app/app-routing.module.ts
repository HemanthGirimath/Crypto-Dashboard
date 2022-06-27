import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NftsComponent } from './hero-section/nfts/nfts.component';
import { TokensComponent } from './hero-section/tokens/tokens.component';
import { TransactionsComponent } from './hero-section/transactions/transactions.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', redirectTo: '/Tokens', pathMatch: 'full'},
    {path:'Tokens', component:TokensComponent},
    {path:'Nfts', component:NftsComponent},
    {path:'Transactions',component:TransactionsComponent},
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
