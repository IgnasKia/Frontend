import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MyMaterialModule } from  './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { ApiService } from './api.service';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RoleDialogComponent } from './role-dialog/role-dialog.component';
import { ChestOpenComponent } from './chest-open/chest-open.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatComponent } from './chat/chat.component';
import { UserComponent } from './user/user.component';
import { TradeCardsComponent } from './trade-cards/trade-cards.component';
import { TradeHistoryComponent } from './trade-history/trade-history.component';
import { GameRealComponent } from './game-real/game-real.component';
import { NavbarGeneralComponent } from './navbar-general/navbar-general.component';
import { CollectionHomeComponent } from './collection-home/collection-home.component';
import { CollectionNavComponent } from './collection-nav/collection-nav.component';
import { UserCoinCollectionComponent } from './user-coin-collection/user-coin-collection.component';
import { UsersCollectionComponent } from './users-collection/users-collection.component';
import { CatalogueCollectionComponent } from './catalogue-collection/catalogue-collection.component';
import { ChatCollectionComponent } from './chat-collection/chat-collection.component';
import { AdminCollectionComponent } from './admin-collection/admin-collection.component';
import { CollectionUserIdComponent } from './collection-user-id/collection-user-id.component';
import { CreateCoinModalComponent } from './create-coin-modal/create-coin-modal.component';
import { CoinDetailsComponent } from './coin-details/coin-details.component';
import { NgxPaginationModule } from 'ngx-pagination';

const config: SocketIoConfig = { url: 'https://pokemon-cards-application.herokuapp.com', options: {transports: ['websocket', 'polling', 'flashsocket']} };

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    UsersComponent,
    NotFoundComponent,
    NavbarComponent,
    AdminPanelComponent,
    RoleDialogComponent,
    ChestOpenComponent,
    ChatComponent,
    UserComponent,
    TradeCardsComponent,
    TradeHistoryComponent,
    GameRealComponent,
    NavbarGeneralComponent,
    CollectionHomeComponent,
    CollectionNavComponent,
    UserCoinCollectionComponent,
    UsersCollectionComponent,
    CatalogueCollectionComponent,
    ChatCollectionComponent,
    AdminCollectionComponent,
    CollectionUserIdComponent,
    CreateCoinModalComponent,
    CoinDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    NgxPaginationModule
  ],
  providers: [AuthGuard, ApiService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
