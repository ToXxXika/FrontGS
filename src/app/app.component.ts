import { Component,OnInit } from '@angular/core';
import {Commande} from './Models/Commande';
import {MessageService} from 'primeng/api';
import {CommandeService} from './Services/commande.service';
import {CartClass} from "./Models/CartClass";
import {ConfirmationService} from "primeng/api";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[MessageService,ConfirmationService]
})

export class AppComponent implements OnInit {
  title = 'FrontGS';

  C:Commande = new Commande();
  dateValue!: Date;
  Games: any[]=[];
  ListQte:any[]=[]
  ListRef:any[]=[]
  Cart:CartClass[]=[]


  constructor(private messageSerivce:MessageService,private CommandeService:CommandeService,private ConfirmationService:ConfirmationService) {
  }
  public RandomGenerator(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  public AddCommande(){

    if((this.ListQte.length==0) ||(this.ListRef.length==0)){
      this.messageSerivce.add({key:"SS",severity:'error',detail:'vous n avez rien a commander'})
    }else {
      this.ConfirmationService.confirm({
        message: 'Are you sure you want to perform this action ?',
        accept: () => {

          let CSJ:CartClass = new CartClass();
          CSJ.qte=this.ListQte;
          CSJ.game=this.ListRef;
           console.log(CSJ)
          this.CommandeService.SaveCommande(CSJ).subscribe(ServerResponse =>{
            if(ServerResponse){
              this.messageSerivce.add({key:"SS",severity:'success',detail:'Commande ajoutée avec success'})
            }else {
              this.messageSerivce.add({key:"SS",severity:'warn',detail:'Commande non ajoutée'})
            }
          },error => {
            this.messageSerivce.add({key:"SS",severity:'error',detail:error})
            console.log(error)
          })
        },
        reject: ()=> {
          console.log("bye")
      }
      });
    }
  }

  ngOnInit(): void {
    this.CommandeService.getGames().subscribe(data=>{
      this.Games=data;
      console.log(this.Games)
    });
  }
  fillList(game:any) {
     let Qte = prompt("Combien de Produits voulez vous ?")
    const CartC: CartClass = new CartClass();
    CartC.qte = Qte
    CartC.game = game;
    let found : boolean=false ;
    if(CartC.qte>CartC.game.qte){
      this.messageSerivce.add({key:"SS",severity:'error',detail:'Quantité demandé est Superieur a notre Stock'})
    }else {
      if (this.Cart.length == 0) {
        this.Cart.push(CartC)
        this.messageSerivce.add({key:'SS',severity:'success',detail:'ajout avec success'})
        this.ListQte.push(+CartC.qte)
        this.ListRef.push(CartC.game.referencej)
      } else {
        this.Cart.forEach(function (item) {
          if (item.game.referencej == CartC.game.referencej) {
            found = true
          }
        })
        if (found == false) {
          this.Cart.push(CartC)
          this.messageSerivce.add({key:"SS",severity:'success',summary:'SUCCESS',detail:'ajout avec success'})
          this.ListQte.push(+CartC.qte)
          this.ListRef.push(CartC.game.referencej)
        } else {
          this.messageSerivce.add({key: "SS", severity: 'error', summary: 'Erreur', detail: 'deja trouvé '});
        }
      }
    }

  }
  //Qte & prix jeu
  CalculPrix(x:any,y:any):number{
    let res = x*y;
    return res
  }

}

