import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { MoralisService } from '../moralis.service';

declare var Moralis;

Moralis.start({serverUrl:environment.server_url,appId:environment.app_id});

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  walletAddress:any;
  user:any
  constructor(private services:MoralisService) { }

  async login() {
    this.user = await Moralis.User.current();
    if (!this.user) {
      let user = await Moralis.authenticate();
      this.walletAddress = user.attributes.ethAddress;
    }
  }

  async logOut() {
    await Moralis.User.logOut();
    console.log("logged out ==>");
  }


 async ngOnInit(){

  }

}
