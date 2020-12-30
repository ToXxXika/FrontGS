import { Component,OnInit } from '@angular/core';
import {Commande} from './Models/Commande';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontGS';

  C:Commande = new Commande();
  dateValue!: Date;
  Games: any;
  selectedGame: any;

  constructor() {
  }
  public RandomGenerator(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  public FillArrays(){

  }
  public AddCommande(ListeQte:any,ListJeu:any){

     this.C.idCommande= this.RandomGenerator(100,9999)
    let days:any= this.dateValue.getDay();
    //add +1 to month cuz it starts from 0
    let month:any=this.dateValue.getMonth()+1;
    let year:any=this.dateValue.getFullYear();
     this.C.dateCommande= days+"-"+month+"-"+year;


  }

  ngOnInit(): void {
    this.Games=[
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ]
  }



}
