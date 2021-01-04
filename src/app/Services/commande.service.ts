import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Commande} from '../Models/Commande';
import {Jeuvideo} from '../Models/Jeuvideo';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private urlGetCommande ="http://localhost:8080/BackEnd/Commande/getAllCommands";
  private urlAddCommande ="http://localhost:8080/BackEnd/Commande/AddCommande";
  private urlGetGames= "http://localhost:8080/BackEnd/JeuVideo/GetAllvideoGames";
  constructor(private Http: HttpClient) { }
  private GetAllcommands(){
    return this.Http.get<Commande[]>(this.urlGetCommande);
  }
  public SaveCommande(ListGame:any){
    console.log("===============================")
        console.log(ListGame)
      return this.Http.post<any>(this.urlAddCommande,ListGame);
  }
  public getGames(){
    return this.Http.get<Jeuvideo[]>(this.urlGetGames);
  }
}
