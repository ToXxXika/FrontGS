import { Component,OnInit } from '@angular/core';
import {Commande} from './Models/Commande';
import {MessageService} from 'primeng/api';
import {CommandeService} from './Services/commande.service';
import {Jeuvideo} from './Models/Jeuvideo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[MessageService]
})
export class AppComponent implements OnInit {
  title = 'FrontGS';

  C:Commande = new Commande();
  dateValue!: Date;
  Games: any[]=[];
  selectedGame: Jeuvideo[]=[];
  draggedGame!: any;



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
    });
  }
  dragStart(game: Jeuvideo) {
    this.draggedGame=game;
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
  drop() {
    if(this.draggedGame){
      let draggedGameIndex = this.findIndex(this.draggedGame);
      this.selectedGame = [...this.selectedGame,this.draggedGame];
      this.Games= this.Games.filter((val,i)=>i !=draggedGameIndex);
      this.draggedGame=null ;
    }
  }
}
