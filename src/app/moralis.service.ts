import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

declare var Moralis;
Moralis.start({serverUrl:environment.server_url,appId:environment.app_id});

@Injectable({
  providedIn: 'root'
})
export class MoralisService {

  constructor() { }

  public user:any

  async getWalletBalance(){
    try{
      const options={chain:'Mumbai'}
      const balances = await Moralis.Web3API.account.getTokenBalances(options);
      // console.log(balances)
      return balances
    }
    catch(error){
      console.log(error)
    }
  }

  async btcPrice() {

    const options1 = {
      //btc
      address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      chain: "eth",
      exchange: "uniswapv3",
    };
  
    const btc = await Moralis.Web3API.token.getTokenPrice(options1);
    return btc.usdPrice
  }

  async ethPrice(){
    const options2 = {
      //ETH
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      chain: "eth",
      exchange: "uniswapv3",
    };
    const eth = await Moralis.Web3API.token.getTokenPrice(options2);
    return eth.usdPrice
  }
  async solPrice(){
    const options = {
      //sol
      address: "0xD31a59c85aE9D8edEFeC411D448f90841571b89c",
      chain: "eth",
      exchange: "uniswapv3",
    };
    const sol = await Moralis.Web3API.token.getTokenPrice(options);
    return sol.usdPrice
  }


  async getTokenTransactions(){
    const options = {chain:'Mumbai',}
    const Data = await Moralis.Web3API.account.getTokenTransfers(options);
    // console.log(Data);
    return Data
  }

  
  date = new Date()
  dates:any = Array(Number(6)).fill(this.date).map((e,i)=>moment().subtract(i,"d").format("YYYY-MM-DD")).reverse();

  getdates(){
     return this.dates
  }
  async getBlocks(){
     const block = (this.dates.map(async(e,i)=> await Moralis.Web3API.native.getDateToBlock({date:e})));
     const blocks = Promise.all(block);
     return blocks
  }
 
}
