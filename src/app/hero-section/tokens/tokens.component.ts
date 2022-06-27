import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MoralisService } from 'src/app/moralis.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { environment } from 'src/environments/environment';

declare var Moralis;
Moralis.start({serverUrl:environment.server_url,appId:environment.app_id});

interface coins {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {
  walletData:any
  specialTokens:any
  btc:number;
  eth:number;
  sol:number;

  value:coins[] = [
    {value:'USDT', viewValue:'0xdAC17F958D2ee523a2206206994597C13D831ec7'},
    {value:'BUSD', viewValue:'0xdAC17F958D2ee523a2206206994597C13D831ec7'},
    {value:'SHIB', viewValue:'0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE'},
    {value:'WBTC', viewValue:'0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'},
  ]
  loginForm = new FormGroup({
    selectedValue:new FormControl('')
  })

  get selectedValue():FormControl{
    return this.loginForm.get("selectedValue") as FormControl
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        fill: true,
        label:'tokens',
        borderColor:'white',
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;
  public lineChartPlugins = [];

  constructor(private service:MoralisService) { }

  async ethUsdPrice(){
    const usdvalue = await this.service.ethPrice();
    const result = this.walletData.filter(item=>{
      if(item.symbol == "ETH"){
      const ethvalue = (item.balance/1000000000000000000)*(usdvalue);
      this.eth = Math.round(ethvalue)
      }
     });
  }
  async btcUsdPrice(){
    const btcvalue = await this.service.btcPrice();
    const result = this.walletData.filter(item=>{
      if(item.symbol == "BTC"){
      const ethvalue = (item.balance/1000000000000000000)*(btcvalue);
      this.btc = Math.round(ethvalue)
      }
     });
  }
  async solUsdPrice(){
    const solvalue = await this.service.solPrice();
    const result = this.walletData.filter(item=>{
      if(item.symbol == "SOL"){
      const ethvalue = (item.balance/1000000000000000000)*(solvalue);
      this.sol = Math.round(ethvalue)
      }
     });
  }

  
  async getTokenPrice(){
    const options = {
      address: this.selectedValue.value,      
    };
    const price = await Moralis.Web3API.token.getTokenPrice(options);
    console.log(price);
  }
  
  displayedColumns: string[] = ['Name','Amt'];
  dataSource : MatTableDataSource<unknown>;

  async ngOnInit() {
    this.walletData = await this.service.getWalletBalance();
     this.service.getWalletBalance().then(data=>{
      this.dataSource = new MatTableDataSource(data)
     })
    // this.specificTokens();
    this.btcUsdPrice();
    this.solUsdPrice();
    this.ethUsdPrice();
  }

}
