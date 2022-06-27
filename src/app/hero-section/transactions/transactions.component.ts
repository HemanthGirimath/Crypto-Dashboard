import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MoralisService } from 'src/app/moralis.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsComponent implements OnInit {

  
  constructor(private service:MoralisService) { }
  
  displayedColumns:string[] =  ['FROM', 'TO', 'AMT','DATE'];
  dataSource: MatTableDataSource<unknown>;

  async ngOnInit() {
  this.service.getTokenTransactions().then(data=>{
    this.dataSource = new MatTableDataSource(data.result)
  })
  
  }

}
