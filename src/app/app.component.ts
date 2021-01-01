import { Component,OnInit } from '@angular/core';
import {Commande} from './Models/Commande';
import {MessageService} from 'primeng/api';
import {CommandeService} from './Services/commande.service';
import {Jeuvideo} from './Models/Jeuvideo';
import {CartClass} from "./Models/CartClass";
import {tryCatch} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[MessageService]
})

export class AppComponent implements OnInit {
  title = 'FrontGS';

  C:Commande = new Commande();
  dateValue!: Date;
  Games: any[]=[];
  selectedGame: Jeuvideo[]=[];
  draggedGame!: any;
  Filtre: any[]=[];
  Cart:CartClass[]=[]
  nItem: CartClass;



  constructor(private messageSerivce:MessageService,private CommandeService:CommandeService) {
  }
  public RandomGenerator(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  public FillArrays(){

  }
 /* public FillListBoxes(){
     this.Games.push({label:'Liste des jeux videos',value:''});
     this.CommandeService.getGames().subscribe(data=>{
       console.log(data[0].nomJeu)
       for(let i=0;i<data.length;i++){
         this.Games.push({label:data[i].nomJeu,value:data[i].referencej})
       }
     })

  }*/
  public AddCommande(ListeQte:any,ListJeu:any){

     this.C.idCommande= this.RandomGenerator(100,9999)
    let days:any= this.dateValue.getDay();
    //add +1 to month cuz it starts from 0
    let month:any=this.dateValue.getMonth()+1;
    let year:any=this.dateValue.getFullYear();
     this.C.dateCommande= days+"-"+month+"-"+year;


  }

  ngOnInit(): void {

    this.selectedGame=[];
    this.CommandeService.getGames().subscribe(data=>{
      this.Games=data;
      console.log(this.Games)
    });
  }
  dragStart(game: Jeuvideo) {
    this.draggedGame=game;
   // console.log(game)
  }
  dragEnd() {
    this.draggedGame=null;
  }
  findIndex(game: Jeuvideo) {
    let index = -1;
    for(let i = 0; i < this.Games.length; i++) {
      if (game.referencej === this.Games[i].referencej) {
        index = i;
        break;
      }
    }
    return index;
  }
 /* VerifQuantite(game:any):boolean{
    console.log(game)
    if(game.qte<this.Quantite){
      this.messageSerivce.add({key:"SS",severity:'error', summary:'Erreur', detail:'Quantité Commandé Indisponible '});
      return false;

    }else{
      return  true ;
    }
  }*/
  fillList(game:any) {
    const CartC: CartClass = new CartClass();
    CartC.Qte = 0;
    CartC.Game = game;
    let found : boolean=false ;
    if(this.Cart.length==0){
      this.Cart.push(CartC)
    }else {
      this.Cart.forEach( function (item){
            if(item.Game.referencej == CartC.Game.referencej){
              found = true
            }
      })
      if(found==false){ // Thank you Tchala5
        this.Cart.push(CartC)
      }else{
        this.messageSerivce.add({key:"SS",severity:'error', summary:'Erreur', detail:'deja trouvé '});
      }
    }
  console.log(this.Cart)
  }



 /*  check(Obj:CartClass):boolean{
     if(Obj.List){
       return false
     } else
    return true ;
   }*/
  drop() {

    if(this.draggedGame){
      let draggedGameIndex = this.findIndex(this.draggedGame);
      this.selectedGame = [...this.selectedGame,this.draggedGame];
      this.Games= this.Games.filter((val,i)=>i !=draggedGameIndex);
      this.draggedGame=null ;
    }
  }
}
