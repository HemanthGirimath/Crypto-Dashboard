import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MoralisService } from '../../moralis.service';

@Component({
  selector: 'app-nfts',
  templateUrl: './nfts.component.html',
  styleUrls: ['./nfts.component.css']
})
export class NftsComponent implements OnInit{
  nftData:any
  nftId:any
  clicked:boolean = false
  constructor(private service:MoralisService) { }


  getdata(){
    fetch('https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=0xa41B58Adcd09C7555941Ad2c8eA8e0a10F2Fa425&order_direction=asc&offset=0&limit=6')
   .then(response =>response.json())
   .then(response =>{
     const data = response.assets;
     this.nftData = data;
     console.log("got nft data ",data)
   })
   .catch(err =>console.error(err))
  }

  getClickedData(data){
    this.nftId = data;
    console.log(this.nftId);
    this.clicked = true
  }
 
  ngOnInit(): void {
    this.getdata();
  }

}
