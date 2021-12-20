import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from './admin.guard';
import { ChatComponent } from './chat/chat.component';
import { UserComponent } from './user/user.component';
import { TradeHistoryComponent } from './trade-history/trade-history.component';
import { GameRealComponent } from './game-real/game-real.component';
import { CollectionHomeComponent } from './collection-home/collection-home.component';
import { UserCoinCollectionComponent } from './user-coin-collection/user-coin-collection.component';
import { UsersCollectionComponent } from './users-collection/users-collection.component';
import { CatalogueCollectionComponent } from './catalogue-collection/catalogue-collection.component';
import { ChatCollectionComponent } from './chat-collection/chat-collection.component';
import { AdminCollectionComponent } from './admin-collection/admin-collection.component';
import { CollectionUserIdComponent } from './collection-user-id/collection-user-id.component';
import { CoinDetailsComponent } from './coin-details/coin-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path: "users", component: UsersComponent, canActivate: [AuthGuard]},
  {path: "user/:id", component: UserComponent, canActivate: [AuthGuard]},
  {path: "admin", component: AdminPanelComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: '404', component: NotFoundComponent},
  {path: "chat/connections", component: ChatComponent, canActivate: [AuthGuard]},
  {path: "trade", component: TradeHistoryComponent, canActivate: [AuthGuard]},
  {path: "choose", component: GameRealComponent, canActivate: [AuthGuard]},
  {path: "collection/home", component: CollectionHomeComponent, canActivate: [AuthGuard]},
  {path: "collection/profile", component: UserCoinCollectionComponent, canActivate: [AuthGuard]},
  {path: "collection/users", component: UsersCollectionComponent, canActivate: [AuthGuard]},
  {path: "collection/catalogue", component: CatalogueCollectionComponent, canActivate: [AuthGuard]},
  {path: "collection/chat", component: ChatCollectionComponent, canActivate: [AuthGuard]},
  {path: "collection/admin", component: AdminCollectionComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: "collection/user/:id", component: CollectionUserIdComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
