import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddServiceService {

  constructor(private firestore: AngularFirestore) { 

  }
  addGame(game:any): Promise<any>{
    return this.firestore.collection('games').add(game)
  }

  getGames(): Observable<any>{
    return this.firestore.collection('games').snapshotChanges();
  }

  deleteGame(id: string): Promise<any>{
    return this.firestore.collection('games').doc(id).delete();
  }

  getGame(id: string): Observable<any>{
    return this.firestore.collection('games').doc(id).snapshotChanges();
  }

  updateGame(id: string, game: any): Promise<any>{
    return this.firestore.collection('games').doc(id).update(game);
  }
}
