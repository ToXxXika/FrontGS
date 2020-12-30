import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Commande} from '../Models/Commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private urlGetCommande ="http://localhost:8080/BackEnd/Commande/getAllCommands";
  private urlAddCommande ="http://localhost:8080/BackEnd/Commande/AddCommande";

  constructor(private Http: HttpClient) { }
  private GetAllcommands(){
    return this.Http.get<Commande[]>(this.urlGetCommande);
  }
  private SaveCommande(ListQte:any,ListRef:any,C:Commande){
    let opts : { params : HttpParams};
    opts = { params : new HttpParams({fromString: 'marque='+ListQte+'&type='+ListRef})};
      return this.Http.post<any>(this.urlAddCommande,C,opts);
  }
}
