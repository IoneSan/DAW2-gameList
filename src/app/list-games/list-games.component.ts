import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AddServiceService } from '../services/add-service.service';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit {
  games: any[]=[];
    
  constructor(private _gameService: AddServiceService) {
      
  }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(){
    this._gameService.getGames().subscribe(data=> {
      this.games=[];
      data.forEach((element: any ) => {
        //console.log(element.payload.doc.data());
        this.games.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  deleteGame(id: string){
    this._gameService.deleteGame(id).then(()=>{
      console.log('juego borrado');
    }).catch(error =>{console.log(error)});
  }
};

