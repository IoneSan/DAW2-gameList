import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AddServiceService } from '../services/add-service.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  createGame: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title = 'Añadir nuevo juego';

  constructor(private fb: FormBuilder, 
            private _addService: AddServiceService,
            private router: Router,
            private routeId: ActivatedRoute) {
    this.createGame = this.fb.group({
      nombre: ['', Validators.required],
      plataforma: ['', Validators.required],
      logros: ['', Validators.required],
      logrosMax: ['', Validators.required],
    })
    this.id = this.routeId.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.updateGame()
  }

  addOrEdit(){
    this.submitted=true;
    if(this.createGame.invalid){
      return;
    }
    if(this.id === null){
      this.addGame()
    }else{
      this.updateGameEntry(this.id)
    }
  }
  
  addGame(){
    
    const game: any ={
      nombre: this.createGame.value.nombre,
      plataforma: this.createGame.value.plataforma,
      logros: this.createGame.value.logros,
      logrosMax: this.createGame.value.logrosMax,
    }
    this.loading = true;
    this._addService.addGame(game).then(() => {
      console.log('juego añadido con exito');
      this.loading=false;
      this.router.navigate(['/'])
    }).catch(error => console.log(error))
  }

  updateGame(){
    if(this.id !==null){
      this.title = 'Actualizar juego';
      this._addService.getGame(this.id).subscribe(data =>{
        this.createGame.setValue({
          nombre: data.payload.data()['nombre'],
          plataforma: data.payload.data()['plataforma'],
          logros: data.payload.data()['logros'],
          logrosMax: data.payload.data()['logrosMax'],
        })
      })
    }
  }

  updateGameEntry(id: string){
    this.loading=true;
    const game: any ={
      nombre: this.createGame.value.nombre,
      plataforma: this.createGame.value.plataforma,
      logros: this.createGame.value.logros,
      logrosMax: this.createGame.value.logrosMax,
    }
    this._addService.updateGame(id, game).then(() => {
      console.log('juego actualizado con exito');
      this.loading=false;
      this.router.navigate(['/'])
    }).catch(error => console.log(error))
  }
}
