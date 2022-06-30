import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Chart from 'chart.js/auto';
import { MoralisService } from '../../moralis.service';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';



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


export class TokensComponent implements OnInit,AfterViewInit {
  walletData:any
  specialTokens:any
  btc:number;
  eth:number;
  sol:number;

  blocks:any;
  dates:any=[];
  TokenUsdPrice:any =[]; 
  usd:any=[];

  @ViewChild('canvas') chart:any ;

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

  async TokenPrice(){
    this.TokenUsdPrice = await Promise.all( await this.blocks.map(async (e,i)=>
    await Moralis.Web3API.token.getTokenPrice({address:this.selectedValue.value,to_block:e.block})
  ))  
    this.filtereTokenPrice();
  }

  async filtereTokenPrice(){
    this.usd = await this.TokenUsdPrice.map(item=>item.usdPrice);//get usdprice
    if(this.chart != null){
      this.chart.destroy();
   };
    this.chart = new Chart('canvas',{
      type:'line',
     data:{
      labels:this.service.getdates(),
      datasets:[
        {
          label:"Histroic Price Data",
          data:this.usd,
          borderWidth:2,
          fill:false,
          borderColor: 'rgb(75, 192, 192)',
        }
      ]
     }
    })
    
  }
  
  displayedColumns: string[] = ['Name','Amt'];
  dataSource : MatTableDataSource<unknown>;

  async ngOnInit() {
    this.walletData = await this.service.getWalletBalance();
     this.service.getWalletBalance().then(data=>{
      this.dataSource = new MatTableDataSource(data)
     })

    this.btcUsdPrice();
    this.solUsdPrice();
    this.ethUsdPrice();
    this.blocks = await this.service.getBlocks(); 
    this.dates = this.service.getdates();
   
  }

  ngAfterViewInit(){
    
  
}

}