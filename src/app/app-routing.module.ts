import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGameComponent } from './add-game/add-game.component';
import { ListGamesComponent } from './list-games/list-games.component';

const routes: Routes = [
  {path: '', component: ListGamesComponent},
  //{path: '', redirectTo: 'gameList', pathMatch: 'full'},
  //{path: 'gameList', loadChildren: () => import("./list-games/list-games.module").then(x => x.ListGamesModule)},
  //{path: 'gameList', component: ListGamesComponent},
  {path: 'addGame', loadChildren: () => import("./add-game/add-game.module").then(x => x.AddGameModule)},
  //{path: 'addGame', component: AddGameComponent},
  {path: 'editGame/:id', loadChildren: () => import("./add-game/add-game.module").then(x => x.AddGameModule)},
  //{path: 'editGame/:id', component: AddGameComponent},
  {path: '**', redirectTo: 'gameList', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
